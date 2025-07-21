import React, { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";
import { API_URL } from "../utils/apiPath";
import UploadAndSign from "./UploadAndSign";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [signatureList, setSignatureList] = useState([]);
  const [signerName, setSignerName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchFiles = async () => {
    const token = localStorage.getItem("loginToken");
    const res = await fetch(`${API_URL}/api/docs/get-allfiles`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setFiles(data.files || []);
  };

  const fetchSignatures = async (fileId) => {
    const token = localStorage.getItem("loginToken");
    const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSignatureList(data.signatures || []);
  };

  const handleViewPdf = async (file) => {
    const cleanedPath = file.filePath.replace(/\\/g, '/');
    setSelectedPdfUrl(`${API_URL}/${cleanedPath}`);    
    setSelectedFileId(file._id);
    await fetchSignatures(file._id);
  };

  const filteredSignatures = signatureList.filter((sig) =>
    filterStatus === "All" ? true : sig.status === filterStatus
  );

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <UploadAndSign />

      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-10">Uploaded Documents</h2>

      <div className="mb-6">
        <label className="mr-2 font-medium text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Signed">Signed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {files.length === 0 ? (
        <p className="text-gray-500">No documents uploaded.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file._id}
              className="border bg-white rounded-lg shadow-sm p-4 flex flex-col items-start justify-between"
            >
              <span className="font-medium text-gray-700 mb-2">{file.originalName}</span>
              <button
                onClick={() => handleViewPdf(file)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
              >
                View PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPdfUrl && (
        <div className="mt-10 border-2 border-blue-400 rounded-lg p-6 bg-blue-50 shadow-lg">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">PDF Preview</h3>

          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-800">Signer Name:</label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter signer name"
              className="w-full max-w-md border px-3 py-2 rounded"
            />
          </div>

          <PdfViewer
            url={selectedPdfUrl}
            signatures={filteredSignatures}
            currentPage={1}
            fileId={selectedFileId}
            signerName={signerName}
            onSignatureAdded={() => fetchSignatures(selectedFileId)}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("loginToken");
                  const response = await fetch(`${API_URL}/api/docs/download-signed/${selectedFileId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                  });

                  if (!response.ok) throw new Error("Download failed");

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "signed-document.pdf";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  alert("Error downloading signed copy: " + err.message);
                  console.error(err);
                }
              }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Download Signed Copy
            </button>

            <button
              onClick={() => {
                setSelectedPdfUrl(null);
                setSignatureList([]);
              }}
              className="border border-red-500 text-red-600 px-6 py-2 rounded hover:bg-red-50 transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
