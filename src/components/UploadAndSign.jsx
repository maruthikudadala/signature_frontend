// import React, { useState } from "react";
// import PdfViewer from "./PdfViewer";
// import { API_URL } from "../utils/apiPath";

// function UploadAndSign() {
//   const [fileId, setFileId] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [signatures, setSignatures] = useState([]);
//   const [signerName, setSignerName] = useState("");



//   const handleFileUpload = async (e) => {
//     const formData = new FormData();
//     formData.append("pdf", e.target.files[0]);

//     const token = localStorage.getItem("loginToken");

//     const res = await fetch(`${API_URL}/api/docs/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData
//     });

//     const data = await res.json();
//     const doc = data.document;

//     const url = `${API_URL}/${doc.filePath.replace(/\\/g, "/")}`;
//     setPdfUrl(url);
//     setFileId(doc._id);
//     setSignatures([]); // clear old signatures
//   };

//   const fetchSignatures = async () => {
//     const token = localStorage.getItem("loginToken");
//     const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const data = await res.json();
//     setSignatures(data.signatures || []);
//   };

//   return (
//     <div className="p-4 border rounded mb-6">
//       <h2 className="text-xl font-bold mb-2">Upload & Sign New PDF</h2>

//       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

//       {pdfUrl && (
//         <>
//           <div className="my-4">
//             <label className="font-medium">Signer Name:</label>
//             <input
//               type="text"
//               value={signerName}
//               onChange={(e) => setSignerName(e.target.value)}
//               placeholder="Enter signer name"
//               className="border px-2 py-1 rounded ml-2"
//             />
//           </div>

//           <PdfViewer
//             url={pdfUrl}
//             fileId={fileId}
//             currentPage={1}
//             signerName={signerName}
//             signatures={signatures}
//             onSignatureAdded={fetchSignatures}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default UploadAndSign;

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
    <div className="p-6 w-[400px] h-[200px] bg-[#f5f5fa] border border-[#e5322d] rounded-[8px] text-center mx-auto mb-[80px]">
      <h2 className="text-2xl font-bold pb-[20px]">Upload & Sign New PDF</h2>

      <input type="file" accept="application/pdf" onChange={handleFileUpload} id="pdfUpload" className="hidden"/>
      <label
          htmlFor="pdfUpload"
          className="inline-block bg-[#e5322d] text-white text-[18px] font-semibold px-[25px] py-[12px] rounded-[8px] border border-[#e5322d] cursor-pointer hover:bg-red-600 transition"
        >
          Select PDF File
        </label>

      {pdfUrl && (
        <>
          <div className="my-4">
            <label className="font-medium">Signer Name:</label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter signer name"
              className="border px-2 py-1 rounded ml-2"
            />
          </div>

          <PdfViewer
            url={pdfUrl}
            fileId={fileId}
            currentPage={1}
            signerName={signerName}
            signatures={signatures}
            onSignatureAdded={fetchSignatures}
          />

          {/* ✅ Download Uploaded PDF Button */}
          <button
            onClick={handleDownloadOriginal}
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
          >
            Download Uploaded PDF
          </button>
        </>
      )}
    </div>
  );
}

export default UploadAndSign;
