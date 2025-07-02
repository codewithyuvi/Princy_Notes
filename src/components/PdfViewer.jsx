// ✅ PdfViewer.jsx
import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useLocation, useNavigate } from "react-router-dom";

// Set worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function PdfViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const pdf_data = location.state;

  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [scale] = useState(1.2); // adjust scale for readability
  const canvasRefs = useRef([]);

  console.log("Received PDF Data:", pdf_data);
  
  const pdfUrl = pdf_data?.pdf_url;
  useEffect(() => {
    if (!pdfUrl) {
      alert("No PDF URL provided");
      navigate("/");
      return;
    }

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
      } catch (error) {
        console.error("Failed to load PDF", error);
        alert("Failed to load PDF");
      }
    };

    loadPDF();
  }, [pdfUrl, navigate]);

  useEffect(() => {
    if (pdfDoc && totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        renderPage(i);
      }
    }
  }, [pdfDoc, totalPages]);

  const renderPage = async (pageNumber) => {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRefs.current[pageNumber - 1];
    if (!canvas) return;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    await page.render(renderContext).promise;
  };

  return (
    <div
      style={{
        height: "90vh",
        overflowY: "scroll",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 className="mb-4 text-center">{pdf_data?.pdf_name || "PDF Viewer"}</h2>
      {[...Array(totalPages)].map((_, index) => (
        <canvas
          key={index}
          ref={(el) => (canvasRefs.current[index] = el)}
          style={{
            display: "block",
            marginBottom: "20px",
            backgroundColor: "white",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        />
      ))}
    </div>
  );
}

export default PdfViewer;
