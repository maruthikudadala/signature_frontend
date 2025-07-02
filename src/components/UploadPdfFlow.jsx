// import React, { useState } from "react";
// import PdfViewer from "./PdfViewer";
// import { API_URL } from "../utils/apiPath";

// const UploadPdfFlow = () => {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [fileId, setFileId] = useState(null);
//   const [signatures, setSignatures] = useState([]);
//   const [signerName, setSignerName] = useState("");

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("pdf", file);

//     const token = localStorage.getItem("loginToken");

//     const res = await fetch(`${API_URL}/api/docs/upload`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     const data = await res.json();
//     const doc = data.document;
//     const cleanedPath = doc.filePath.replace(/\\/g, "/");

//     setPdfUrl(`${API_URL}/${cleanedPath}`);
//     setFileId(doc._id);
//     setSignatures([]);
//   };

//   const fetchSignatures = async () => {
//     const token = localStorage.getItem("loginToken");
//     const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setSignatures(data.signatures || []);
//   };

//   const handleDownload = async () => {
//     const confirmDownload = window.confirm("Are you sure you want to download the signed PDF?");
//     if (!confirmDownload) return;

//     const token = localStorage.getItem("loginToken");
//     const response = await fetch(`${API_URL}/api/docs/download-signed/${fileId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       alert("Download failed");
//       return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "signed-document.pdf";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Upload and Sign PDF</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileUpload} />

//       {pdfUrl && (
//         <>
//           <div className="my-4">
//             <label className="block font-medium">Signer Name:</label>
//             <input
//               type="text"
//               value={signerName}
//               onChange={(e) => setSignerName(e.target.value)}
//               placeholder="Enter signer name"
//               className="border px-2 py-1 rounded w-full sm:w-64"
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

//           <button
//             onClick={handleDownload}
//             className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
//           >
//             Download Signed Copy
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadPdfFlow;

// import React, { useState } from "react";
// import PdfViewer from "./PdfViewer";
// import { API_URL } from "../utils/apiPath";

// const FONT_OPTIONS = [
//   { label: "Default", value: "inherit" },
//   { label: "Italic", value: "italic" },
//   { label: "Times New Roman", value: "'Times New Roman', serif" },
//   { label: "Cursive", value: "cursive" },
//   { label: "Monospace", value: "monospace" },
//   { label: "Arial", value: "Arial, sans-serif" },
// ];

// const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

// function UploadPdfFlow() {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [fileId, setFileId] = useState(null);
//   const [signatures, setSignatures] = useState([]);
//   const [signerName, setSignerName] = useState("");
//   const [selectedFont, setSelectedFont] = useState("inherit");
//   const [selectedFontSize, setSelectedFontSize] = useState(16);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("pdf", file);

//     const token = localStorage.getItem("loginToken");

//     const res = await fetch(`${API_URL}/api/docs/upload`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     const data = await res.json();
//     const doc = data.document;
//     const cleanedPath = doc.filePath.replace(/\\/g, "/");

//     setPdfUrl(`${API_URL}/${cleanedPath}`);
//     setFileId(doc._id);
//     setSignatures([]);
//   };

//   const fetchSignatures = async () => {
//     const token = localStorage.getItem("loginToken");
//     const res = await fetch(`${API_URL}/api/signature/get-by-file/${fileId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setSignatures(data.signatures || []);
//   };

//   // ✅ Missing: DOWNLOAD FUNCTION
//   const handleDownload = async () => {
//     const confirmDownload = window.confirm("Are you sure you want to download the signed PDF?");
//     if (!confirmDownload) return;

//     const token = localStorage.getItem("loginToken");
//     const response = await fetch(`${API_URL}/api/docs/download-signed/${fileId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       alert("Download failed");
//       return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "signed-document.pdf";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6">
//       {/* <h2 className="text-2xl font-bold mb-4">Upload and Sign PDF</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileUpload} /> */}
//       <div
//   className="p-6 w-[400px] h-[200px] bg-[#f5f5fa] border border-[#e5322d] rounded-[8px] text-center mx-auto mb-[80px]"
// >
//   <h2 className="text-2xl font-bold pb-[20px]">Upload and Sign PDF</h2>

//   {/* Hidden File Input */}
//   <input
//     type="file"
//     accept="application/pdf"
//     id="pdfUpload"
//     onChange={handleFileUpload}
//     className="hidden"
//   />

//   {/* Custom File Upload Button */}
//   <label
//     htmlFor="pdfUpload"
//     //className="inline-block px-[30px] py-[20px] text-white font-bold text-[20px] bg-[#e5322d] border border-[#e5322d] rounded-[8px] cursor-pointer hover:bg-red-600 transition"
//   className="inline-block bg-[#e5322d] text-white text-[18px] font-semibold px-[25px] py-[12px] rounded-[8px] border border-[#e5322d] cursor-pointer hover:bg-red-600 transition"
//   >
//     Select PDF File
//   </label>
// </div>


//       {pdfUrl && (
//         <>
//           <div className="my-4">
//             <label className="block font-medium">Signer Name:</label>
//             <input
//               type="text"
//               value={signerName}
//               onChange={(e) => setSignerName(e.target.value)}
//               placeholder="Enter signer name"
//               className="border px-2 py-1 rounded w-full sm:w-64"
//             />
//           </div>

//           {/* Font Selection */}
//           <div className="mb-4">
//             <label className="block font-medium">Choose Font Style:</label>
//             <select
//               value={selectedFont}
//               onChange={(e) => setSelectedFont(e.target.value)}
//               className="border px-2 py-1 rounded w-full sm:w-64"
//             >
//               {FONT_OPTIONS.map((font) => (
//                 <option key={font.value} value={font.value}>
//                   {font.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Font Size Selection */}
//           <div className="mb-4">
//             <label className="block font-medium">Font Size (px):</label>
//             <select
//               value={selectedFontSize}
//               onChange={(e) => setSelectedFontSize(Number(e.target.value))}
//               className="border px-2 py-1 rounded w-full sm:w-64"
//             >
//               {FONT_SIZES.map((size) => (
//                 <option key={size} value={size}>
//                   {size}px
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Live Preview */}
//           <div className="mb-4">
//             <p className="text-sm text-gray-600 mb-1">Live Preview:</p>
//             <div
//               className="border p-2 rounded bg-white shadow"
//               style={{ fontFamily: selectedFont, fontSize: `${selectedFontSize}px` }}
//             >
//               {signerName || "Preview will appear here"}
//             </div>
//           </div>

//           <PdfViewer
//             url={pdfUrl}
//             fileId={fileId}
//             currentPage={1}
//             signerName={signerName}
//             signerFont={selectedFont}
//             fontSize={selectedFontSize}
//             signatures={signatures}
//             onSignatureAdded={fetchSignatures}
//           />

//           {/* ✅ Show this only when signature exists */}
//           {signatures.length > 0 && (
//             <button
//               onClick={handleDownload}
//               className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
//             >
//               Download Signed Copy
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default UploadPdfFlow;

import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import { API_URL } from "../utils/apiPath";

const FONT_OPTIONS = [
  { label: "Default", value: "inherit" },
  { label: "Italic", value: "italic" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Cursive", value: "cursive" },
  { label: "Monospace", value: "monospace" },
  { label: "Arial", value: "Arial, sans-serif" },
];

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

function UploadPdfFlow() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [signerName, setSignerName] = useState("");
  const [selectedFont, setSelectedFont] = useState("inherit");
  const [selectedFontSize, setSelectedFontSize] = useState(16);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);
    const token = localStorage.getItem("loginToken");

    const res = await fetch(`${API_URL}/api/docs/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    const doc = data.document;
    const cleanedPath = doc.filePath.replace(/\\/g, "/");

    setPdfUrl(`${API_URL}/${cleanedPath}`);
    setFileId(doc._id);
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

  const handleDownload = async () => {
    const confirmDownload = window.confirm("Are you sure you want to download the signed PDF?");
    if (!confirmDownload) return;

    const token = localStorage.getItem("loginToken");
    const response = await fetch(`${API_URL}/api/docs/download-signed/${fileId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      alert("Download failed");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signed-document.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      {/* Upload Section */}
      <div className="p-6 w-[400px] h-[200px] bg-[#f5f5fa] border border-[#e5322d] rounded-[8px] text-center mx-auto mb-[80px]">
        <h2 className="text-2xl font-bold pb-[20px]">Upload and Sign PDF</h2>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="application/pdf"
          id="pdfUpload"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Upload Button */}
        <label
          htmlFor="pdfUpload"
          className="inline-block bg-[#e5322d] text-white text-[18px] font-semibold px-[25px] py-[12px] rounded-[8px] border border-[#e5322d] cursor-pointer hover:bg-red-600 transition"
        >
          Select PDF File
        </label>
      </div>

      {/* PDF Viewer & Signature Panel */}
      {pdfUrl && (
  <div className="flex flex-row gap-10 mt-10 w-full">
    {/* Left: PDF Viewer (55%) */}
    <div className="w-[55%] border p-4 bg-white rounded shadow mr-[30px]">
      <div className="w-[50%] px-[80px] px-4">
        <PdfViewer
          url={pdfUrl}
          fileId={fileId}
          currentPage={1}
          signerName={signerName}
          signerFont={selectedFont}
          fontSize={selectedFontSize}
          signatures={signatures}
          onSignatureAdded={fetchSignatures}
        />
      </div>
    </div>

    {/* Right: Signature Controls (Remaining 45%) */}
    <div className="w-[40%] border p-6 bg-[#f9f9fc] rounded shadow ml-[20px]">
    <div className="mb-4 flex items-center gap-4 my-[20px]">
  <label className="text-[18px] font-bold text-gray-700 mr-[20px]" htmlFor="signerName">
    Signer Name:
  </label>
  <input
    id="signerName"
    type="text"
    value={signerName}
    onChange={(e) => setSignerName(e.target.value)}
    placeholder="Enter signer name"
    className="w-[400px] h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      <div className="mb-4 flex items-center gap-4 my-[20px]">
        <label className="text-[18px] font-bold text-gray-700 mr-[20px]">Choose Font Style:</label>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="w-[400px] h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex items-center gap-4 my-[20px]">
        <label className="text-[18px] font-bold text-gray-700 mr-[20px]">Font Size (px):</label>
        <select
          value={selectedFontSize}
          onChange={(e) => setSelectedFontSize(Number(e.target.value))}
          className="w-[400px] h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* Live Preview */}
      <div className="mb-4 flex items-center gap-4 my-[20px]">
        <p className="text-[18px] font-bold text-gray-700 mr-[20px]">Live Preview:</p>
        <div
          className="w-[400px] h-[40px] px-4 border border-gray-300 rounded text-[16px] text-center placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 items-center justify-center"
          style={{ fontFamily: selectedFont, fontSize: `${selectedFontSize}px` }}
        >
          {signerName || "Preview will appear here"}
        </div>
      </div>
      {/* Live Preview Draggable */}
{/* <div className="mb-4 flex flex-col gap-2 my-[20px]">
  <p className="text-[16px] text-gray-600 italic">
    Drag the signature box onto the PDF to place the signer name.
  </p>

  {signerName && (
    <div
      draggable
      onDragStart={(e) => {
        const dragData = {
          signerName,
          font: selectedFont,
          fontSize: selectedFontSize,
        };
        e.dataTransfer.setData("application/signature", JSON.stringify(dragData));
      }}
      className="w-[400px] h-[40px] flex items-center justify-center border border-gray-300 rounded text-[16px] text-center bg-white shadow cursor-grab"
      style={{
        fontFamily: selectedFont,
        fontSize: `${selectedFontSize}px`,
      }}
    >
      {signerName}
    </div>
  )}
</div> */}


      {signatures.length > 0 && (
        <button
          onClick={handleDownload}
          className="inline-block bg-[#e5322d] text-white text-[18px] font-semibold px-[25px] py-[12px] rounded-[8px] border border-[#e5322d] cursor-pointer hover:bg-red-600 transition ml-[180px]"
          //className="inline-flex items-center justify-center bg-[#e5322d] text-white text-[18px] font-semibold px-[25px] py-[12px] rounded-[8px] border border-[#e5322d] cursor-pointer hover:bg-red-600 transition"

        >
          Download Signed Copy
        </button>
      )}
    </div>
  </div>
)}
 

      
    </div>
  );
}

export default UploadPdfFlow;
