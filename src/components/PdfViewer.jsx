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
  const [scale, setScale] = useState(1.2); // scale can change now!
  const canvasRefs = useRef([]);

  const lastPinchDist = useRef(null);
  const viewerRef = useRef(null);

const pdfUrl = pdf_data?.fileUrl || pdf_data?.fileName;

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

  // Render pages, and re-render on zoom changes
  useEffect(() => {
    if (pdfDoc && totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        renderPage(i, scale);
      }
    }
    // eslint-disable-next-line
  }, [pdfDoc, totalPages, scale]);

  const renderPage = async (pageNumber, scaleVal) => {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: scaleVal });
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

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4));
  const handleResetZoom = () => setScale(1.2);

  // Pinch zoom handlers
  function getPinchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = getPinchDist(e.touches);
      lastPinchDist.current = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = getPinchDist(e.touches);
      if (lastPinchDist.current != null) {
        const delta = dist - lastPinchDist.current;
        if (Math.abs(delta) > 3) {
          setScale((s) => Math.max(0.4, Math.min(s + delta * 0.005, 4)));
          lastPinchDist.current = dist;
        }
      }
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    lastPinchDist.current = null;
  };

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.addEventListener("touchstart", handleTouchStart, { passive: false });
    viewer.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewer.addEventListener("touchend", handleTouchEnd);
    return () => {
      viewer.removeEventListener("touchstart", handleTouchStart);
      viewer.removeEventListener("touchmove", handleTouchMove);
      viewer.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Button styles
  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontWeight: "600",
    color: "#333",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#e0e0e0",
    boxShadow: "0 3px 7px rgba(0,0,0,0.15)",
  };

  const [hoveredBtn, setHoveredBtn] = React.useState(null);

  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "90vh",
          width: "90vw",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* PDF Name */}
        <h2
          style={{
            margin: "1rem 1.5rem 0 1.5rem",
            fontWeight: "600",
            fontSize: "1.25rem",
            color: "#333",
            textAlign: "center",
          }}
        >
          {pdf_data?.pdf_name || "PDF Viewer"}
        </h2>

        {/* Sticky header with buttons, centered */}
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e0e0e0",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            zIndex: 10,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <button
            style={hoveredBtn === "zoomOut" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onClick={handleZoomOut}
            onMouseEnter={() => setHoveredBtn("zoomOut")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            -
          </button>
          <span style={{ margin: "0 8px", fontWeight: "bold" }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            style={hoveredBtn === "zoomIn" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onClick={handleZoomIn}
            onMouseEnter={() => setHoveredBtn("zoomIn")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            +
          </button>
          <button
            style={hoveredBtn === "reset" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onClick={handleResetZoom}
            onMouseEnter={() => setHoveredBtn("reset")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            Reset
          </button>
        </div>

        {/* Scrollable PDF content */}
        <div
          ref={viewerRef}
          style={{
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
            padding: "1rem",
            touchAction: "pan-x pan-y",
            backgroundColor: "#f9f9f9",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // center horizontally
            }}
          >
            {[...Array(totalPages)].map((_, index) => (
              <canvas
                key={index}
                ref={(el) => (canvasRefs.current[index] = el)}
                style={{
                  display: "block",
                  marginBottom: "20px",
                  backgroundColor: "white",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
