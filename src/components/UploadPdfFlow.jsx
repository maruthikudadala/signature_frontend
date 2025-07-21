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
  const [signTextColor, setSignTextColor] = useState("#000000"); // default black
  const [signBgColor, setSignBgColor] = useState("transparent"); // default transparent


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
      {/* Upload Box */}
      <div className="p-6 w-[400px] h-[200px] bg-gradient-to-br from-red-100 to-red-50 border border-red-400 rounded-lg text-center mx-auto mb-20 shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Upload and Sign PDF</h2>

        <input
          type="file"
          accept="application/pdf"
          id="pdfUpload"
          onChange={handleFileUpload}
          className="hidden"
        />

         <label
          htmlFor="pdfUpload"
          className="bg-red-600 hover:bg-red-700 transition text-white text-lg font-semibold px-6 py-2 rounded-md cursor-pointer shadow-md"
        >
          Select PDF File
        </label>
      </div>

      {pdfUrl && (
    <div className="flex flex-row gap-6 mt-10 w-full overflow-x-auto lg:flex-nowrap flex-nowrap">


          {/* PDF Viewer */}
          <div className="min-w-[550px] lg:w-[80%] border p-4 bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-lg">

            <div className="px-4">
              <PdfViewer
                url={pdfUrl}
                fileId={fileId}
                currentPage={1}
                signerName={signerName}
                signerFont={selectedFont}
                fontSize={selectedFontSize}
                signTextColor={signTextColor}          
                signBgColor={signBgColor} 
                signatures={signatures}
                onSignatureAdded={fetchSignatures}
              />
            </div>
          </div>

        
          {/* Signature Controls */}
          <div className="min-w-[450px] lg:w-[50%] border p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-xl shadow-lg">
            <div className="space-y-6">
              {/* Signer Name */}
              <div>
                <label htmlFor="signerName" className="block text-lg font-semibold text-gray-800 mb-1">
                  Signer Name
                </label>
                <input
                  id="signerName"
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  placeholder="Enter signer name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Font Style */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-1">Choose Font Style</label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-1">Font Size (px)</label>
                <select
                  value={selectedFontSize}
                  onChange={(e) => setSelectedFontSize(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {FONT_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Color Picker */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-1">Text Color</label>
                <input
                  type="color"
                  value={signTextColor}
                  onChange={(e) => setSignTextColor(e.target.value)}
                  className="w-16 h-10 p-1 border border-gray-300 rounded-md"
                />
              </div>

              {/* Background Color Picker */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-1">Signature Background Color</label>
                <input
                  type="color"
                  value={signBgColor}
                  onChange={(e) => setSignBgColor(e.target.value)}
                  className="w-16 h-10 p-1 border border-gray-300 rounded-md"
                />
              </div>

              {/* Live Preview */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-1">Live Preview</label>
                <div
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-center"
                  style={{
                    fontFamily: selectedFont,
                    fontSize: `${selectedFontSize}px`,
                    backgroundColor: signBgColor,
                    color: signTextColor,
                  }}
                >
                  {signerName || "Preview will appear here"}
                </div>
              </div>

              {/* Download Button */}
              {signatures.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition shadow"
                >
                  Download Signed Copy
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default UploadPdfFlow;
