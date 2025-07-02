// import React, { useEffect, useState } from "react";
// import PdfViewer from "./PdfViewer";
// import { API_URL } from "../utils/apiPath";

// function Dashboard() {
//   const [files, setFiles] = useState([]);
//   const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
//   const [selectedFileId, setSelectedFileId] = useState(null);
//   const [signatureList, setSignatureList] = useState([]);
//   const [signerName, setSignerName] = useState("");

//   const fetchFiles = async () => {
//     try {
//       const token = localStorage.getItem("loginToken");
//       const res = await fetch(`${API_URL}/api/docs/get-allfiles`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (res.ok && Array.isArray(data.files)) {
//         setFiles(data.files);
//       } else {
//         setFiles([]);
//         console.warn("Unexpected files response", data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch files", err);
//       setFiles([]);
//     }
//   };

//   const fetchSignatures = async (fileId) => {
//     try {
//       const token = localStorage.getItem("loginToken");
//       const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (res.ok && Array.isArray(data.signatures)) {
//         setSignatureList(data.signatures);
//       } else {
//         setSignatureList([]);
//         console.warn("Unexpected signatures response", data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch signatures", err);
//       setSignatureList([]);
//     }
//   };

//   const handleViewPdf = async (file) => {
//     const cleanedPath = file.filePath.replace(/\\/g, '/');
//     setSelectedPdfUrl(`${API_URL}/${cleanedPath}`);
//     setSelectedFileId(file._id);
//     await fetchSignatures(file._id);
//   };
  

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>

//       {files.length === 0 ? (
//         <p>No documents uploaded.</p>
//       ) : (
//         <div className="space-y-4">
//           {files.map((file, index) => (
//             <div
//               key={index}
//               className="border p-4 rounded flex justify-between items-center"
//             >
//               <span>{file.originalName}</span>
//               <button
//                 onClick={() => handleViewPdf(file)}
//                 className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
//               >
//                 View
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedPdfUrl && (
//         <div className="mt-6">
//           <h3 className="text-xl mb-2 font-semibold">PDF Preview</h3>
//           {/* <PdfViewer
//             url={selectedPdfUrl}
//             signatures={signatureList}
//             currentPage={1}
//           /> */}
//           <PdfViewer
//           url={selectedPdfUrl}
//           signatures={signatureList}
//           currentPage={1}
//           fileId={selectedFileId}
//           onSignatureAdded={() => fetchSignatures(selectedFileId)} // ⬅️ key change
//               />

//           <button
//             onClick={() => {
//               setSelectedPdfUrl(null);
//               setSignatureList([]);
//             }}
//             className="text-red-500 mt-2 underline"
//           >
//             Close Preview
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

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
    <div className="p-4 sm:p-6">
      <UploadAndSign /> 
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Uploaded Documents</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Signed">Signed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {files.length === 0 ? (
        <p>No documents uploaded.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file._id} className="border p-4 rounded flex flex-col sm:flex-row justify-between items-center">
              <span className="text-center sm:text-left">{file.originalName}</span>
              <button
                onClick={() => handleViewPdf(file)}
                className="bg-blue-500 text-white px-4 py-1 mt-2 sm:mt-0 rounded hover:bg-blue-600"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPdfUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">PDF Preview</h3>

          <div className="mb-4">
            <label className="block font-medium mb-1">Signer Name:</label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter signer name"
              className="border px-3 py-1 rounded w-full sm:w-64"
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
          <button
  onClick={async () => {
    try {
      const token = localStorage.getItem("loginToken");
      const response = await fetch(`${API_URL}/api/docs/download-signed/${selectedFileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "signed-document.pdf"; // you can dynamically name it if needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading signed copy: " + err.message);
      console.error(err);
    }
  }}
  className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
>
  Download Signed Copy
</button>


          <button
            onClick={() => {
              setSelectedPdfUrl(null);
              setSignatureList([]);
            }}
            className="text-red-500 mt-2 underline"
          >
            Close Preview
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
