// import React from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Correct modern worker setup
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// function PdfViewer({ url, signatures = [], currentPage }) {
//   return (
//     <div className="relative border rounded p-4">
//       <Document file={url} onLoadError={console.error}>
//         <Page pageNumber={currentPage} />
//       </Document>

//       {/* Signature placeholders overlay */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//         {signatures
//           .filter((sig) => sig.page === currentPage)
//           .map((sig) => (
//             <div
//               key={sig._id}
//               className="absolute bg-yellow-300 px-2 py-1 text-xs border rounded shadow"
//               style={{
//                 top: `${sig.y}px`,
//                 left: `${sig.x}px`,
//                 zIndex: 1000,
//               }}
//             >
//               {sig.signer}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
//   //console.log("Signatures:", signatures);
// }

// export default PdfViewer;

// import React, { useRef } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// function PdfViewer({ url, signatures = [], currentPage, fileId, onSignatureAdded }) {
//   const pageWrapperRef = useRef(null);

//   const handlePdfClick = async (e) => {
//     const token = localStorage.getItem("loginToken");
//     const rect = pageWrapperRef.current.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const response = await fetch("http://localhost:4001/api/signature/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         fileId,
//         signer: "maruthinew",
//         x: Math.round(x),
//         y: Math.round(y),
//         page: currentPage
//       })
//     });

//     const data = await response.json();
//     console.log("Signature saved:", data);

//     // 🔁 Notify parent to reload signatures only
//     if (typeof onSignatureAdded === 'function') {
//       onSignatureAdded();
//     }
//   };

//   return (
//     <div className="border rounded p-4">
//       <Document file={url} onLoadError={console.error}>
//         <div
//           ref={pageWrapperRef}
//           className="relative cursor-crosshair"
//           onClick={handlePdfClick}
//         >
//           <Page pageNumber={currentPage} width={600} />

//           {signatures
//             .filter((sig) => sig.page === currentPage)
//             .map((sig) => (
//               <div
//                 key={sig._id}
//                 className="absolute bg-yellow-300 px-2 py-1 text-xs border rounded shadow"
//                 style={{
//                   left: `${sig.x}px`,
//                   top: `${sig.y}px`,
//                   zIndex: 1000,
//                 }}
//               >
//                 {sig.signer}
//               </div>
//             ))}
//         </div>
//       </Document>
//     </div>
//   );
// }


// export default PdfViewer;


// import React, { useRef } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // PDF worker setup
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// function PdfViewer({ url, signatures = [], currentPage, fileId, signerName, onSignatureAdded }) {
//   const pageWrapperRef = useRef(null);

//   const handlePdfClick = async (e) => {
//     const token = localStorage.getItem("loginToken");
//     const rect = pageWrapperRef.current.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     if (!signerName) {
//       alert("Please enter signer name before placing signature.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4001/api/signature/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           fileId,
//           signer: signerName,
//           x: Math.round(x),
//           y: Math.round(y),
//           page: currentPage
//         })
//       });

//       const data = await response.json();
//       console.log("Signature saved:", data);

//       if (typeof onSignatureAdded === 'function') {
//         onSignatureAdded();
//       }
//     } catch (error) {
//       console.error("Failed to add signature:", error);
//     }
//   };

//   return (
//     <div className="border rounded p-4">
//       <Document file={url} onLoadError={console.error}>
//         <div
//           ref={pageWrapperRef}
//           className="relative cursor-crosshair"
//           onClick={handlePdfClick}
//         >
//           <Page pageNumber={currentPage} width={600} />

//           {signatures
//             .filter((sig) => sig.page === currentPage)
//             .map((sig) => (
//               <div
//                 key={sig._id}
//                 className="absolute bg-yellow-300 px-2 py-1 text-xs border rounded shadow"
//                 style={{
//                   left: `${sig.x}px`,
//                   top: `${sig.y}px`,
//                   zIndex: 1000,
//                 }}
//               >
//                 {sig.signer}
//               </div>
//             ))}
//         </div>
//       </Document>
//     </div>
//   );
// }

// export default PdfViewer;


import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { API_URL } from "../utils/apiPath";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({ url, signatures = [], currentPage, fileId, signerName,signerFont,fontSize, onSignatureAdded }) {
  const pageWrapperRef = useRef(null);
  const [draggedSignatureId, setDraggedSignatureId] = useState(null);
  //const [signaturePlaced, setSignaturePlaced] = useState(false);


  const handlePdfClick = async (e) => {
    if (e.target.tagName === "BUTTON") return;
    const token = localStorage.getItem("loginToken");
    const rect = pageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!signerName) {
      alert("Please enter signer name before placing signature.");
      return;
    }

    const existing = signatures.find(sig => sig.signer === signerName && sig.page === currentPage);
    if (existing) {
      alert("This signer name already placed. Drag to move it.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/signature/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fileId,
          signer: signerName,
          x: Math.round(x),
          y: Math.round(y),
          page: currentPage,
          font: signerFont,
          fontSize: fontSize,
        })
      });

      const data = await response.json();
      if (onSignatureAdded) onSignatureAdded();
    } catch (error) {
      console.error("Failed to add signature:", error);
    }
  };

  const handleDragStart = (e, signatureId) => {
    setDraggedSignatureId(signatureId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Important to allow drop
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("loginToken");

    const rect = pageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const response = await fetch(`${API_URL}/api/signature/update-position/${draggedSignatureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ x: Math.round(x), y: Math.round(y) }),
      });

      const data = await response.json();
      setDraggedSignatureId(null);
      if (onSignatureAdded) onSignatureAdded(); // Refresh signatures
      
    } catch (error) {
      console.error("Failed to update signature:", error);
    }
  };

  const deleteSignature = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/signature/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (onSignatureAdded) onSignatureAdded(); // refresh the preview
      }
    } catch (error) {
      console.error("Failed to delete signature:", error);
    }
  };
  

  return (
    <div className="border rounded p-4">
      <Document file={url} onLoadError={console.error}>
        <div
          ref={pageWrapperRef}
          className="relative cursor-crosshair"
          onClick={handlePdfClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ position: "relative" }} // Ensure absolute children position correctly
        >
          <Page pageNumber={currentPage} width={600} />

          {signatures
            .filter(sig => sig.page === currentPage)
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
                }}
              >
                {sig.signer}
                <button
                onClick={() => deleteSignature(sig._id)}
                className="ml-2 text-red-600 text-xs"> ✕ </button>
              </div>
            ))}
        </div>
      </Document>
    </div>
  );
}

export default PdfViewer;
