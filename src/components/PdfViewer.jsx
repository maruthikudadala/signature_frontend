import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { API_URL } from "../utils/apiPath";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({
  url,
  signatures = [],
  fileId,
  signerName,
  signerFont,
  fontSize,
  signTextColor,
  signBgColor,
  onSignatureAdded,
}) {
  const pageRefs = useRef({});
  const [numPages, setNumPages] = useState(null);
  const [draggedSignatureId, setDraggedSignatureId] = useState(null);

  const handlePdfClick = async (e, pageNumber) => {
    if (e.target.tagName === "BUTTON") return;
    const token = localStorage.getItem("loginToken");

    const rect = pageRefs.current[pageNumber].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!signerName) {
      alert("Please enter signer name before placing signature.");
      return;
    }

    const existing = signatures.find(sig => sig.signer === signerName && sig.page === pageNumber);
    if (existing) {
      alert("This signer name already placed. Drag to move it.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/signature/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileId,
          signer: signerName,
          x: Math.round(x),
          y: Math.round(y),
          page: pageNumber,
          font: signerFont,
          fontSize: fontSize,
        }),
      });

      if (response.ok && onSignatureAdded) onSignatureAdded();
    } catch (error) {
      console.error("Failed to add signature:", error);
    }
  };

  const handleDragStart = (e, signatureId) => {
    setDraggedSignatureId(signatureId);
  };

  const handleDrop = async (e, pageNumber) => {
    e.preventDefault();
    const rect = pageRefs.current[pageNumber].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const res = await fetch(`${API_URL}/api/signature/update-position/${draggedSignatureId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: Math.round(x), y: Math.round(y) }),
      });

      if (res.ok && onSignatureAdded) onSignatureAdded();
      setDraggedSignatureId(null);
    } catch (error) {
      console.error("Failed to update signature:", error);
    }
  };

  const deleteSignature = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/signature/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok && onSignatureAdded) onSignatureAdded();
    } catch (error) {
      console.error("Failed to delete signature:", error);
    }
  };

  return (
    <div className="border rounded p-4">
      <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.from(new Array(numPages), (_, index) => {
          const pageNumber = index + 1;
          return (
            <div
              key={pageNumber}
              ref={(el) => (pageRefs.current[pageNumber] = el)}
              onClick={(e) => handlePdfClick(e, pageNumber)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, pageNumber)}
              className="relative my-6 shadow-lg mx-auto w-fit cursor-crosshair"
            >
              <Page pageNumber={pageNumber} width={600} />

              {signatures
                .filter(sig => sig.page === pageNumber)
                .map(sig => (
                  <div
                    key={sig._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, sig._id)}
                    className="absolute bg-yellow-300 px-2 py-1 border rounded shadow cursor-move"
                    style={{
                      left: `${sig.x}px`,
                      top: `${sig.y}px`,
                      zIndex: 1000,
                      fontFamily: sig.font || "inherit",
                      fontSize: sig.fontSize ? `${sig.fontSize}px` : "16px",
                      backgroundColor: signBgColor || "transparent",
                      color: signTextColor || "#000",
                    }}
                  >
                    {sig.signer}
                    <button
                      onClick={() => deleteSignature(sig._id)}
                      className="ml-2 text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>
          );
        })}
      </Document>
    </div>
  );
}

export default PdfViewer;
