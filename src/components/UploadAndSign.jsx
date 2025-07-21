import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import { API_URL } from "../utils/apiPath";

function UploadAndSign() {
  const [fileId, setFileId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [signerName, setSignerName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);
    const token = localStorage.getItem("loginToken");

    const res = await fetch(`${API_URL}/api/docs/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    const doc = data.document;

    setPdfUrl(`${API_URL}/${doc.filePath.replace(/\\/g, "/")}`);
    setFileId(doc._id);
    setUploadedFileName(doc.originalName);
    setSignatures([]);
  };

  const fetchSignatures = async () => {
    const token = localStorage.getItem("loginToken");
    const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setSignatures(data.signatures || []);
  };

  const handleDownloadOriginal = () => {
    const confirmDownload = window.confirm("Are you sure you want to download the uploaded PDF?");
    if (!confirmDownload) return;

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = uploadedFileName || "document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="p-4 md:p-6 w-full flex flex-col md:flex-row gap-6 justify-center items-start">
      
      {/* Left: Upload Card */}
      <div className="w-full md:w-[400px] bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 border-2 border-[#e5322d] rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#e5322d] mb-4">Upload & Sign PDF</h2>

        <input type="file" accept="application/pdf" onChange={handleFileUpload} id="pdfUpload" className="hidden"/>
        <label
          htmlFor="pdfUpload"
          className="inline-block bg-[#e5322d] text-white font-semibold px-5 py-2 rounded-md cursor-pointer hover:bg-red-700 transition"
        >
          Select PDF File
        </label>

        {pdfUrl && (
          <>
            <div className="my-4 text-left">
              <label className="font-medium text-gray-800">Signer Name:</label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Enter signer name"
                className="w-full border px-3 py-2 rounded mt-2"
              />
            </div>

            <button
              onClick={handleDownloadOriginal}
              className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-md w-full hover:bg-blue-700 transition"
            >
              Download Uploaded PDF
            </button>
          </>
        )}
      </div>

      {/* Right: PDF Viewer */}
      {pdfUrl && (
        <div className="w-full md:flex-1 overflow-auto max-h-[90vh] rounded-xl border border-gray-300 shadow-md bg-white">
          <PdfViewer
            url={pdfUrl}
            fileId={fileId}
            currentPage={1}
            signerName={signerName}
            signatures={signatures}
            onSignatureAdded={fetchSignatures}
          />
        </div>
      )}
    </div>
  );
}

export default UploadAndSign;
