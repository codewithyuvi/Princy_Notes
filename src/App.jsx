import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import UnitList from "./components/UnitList";
import HomePage from "./components/HomePage";
import PdfViewer from "./components/PdfViewer";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/notes/:subjectId" element={<UnitList />} />
         <Route path="/pdf-viewer" element={<PdfViewer />} />
         

      </Routes>

      <Footer />
      
      
      
    </Router>
  );
}

export default App;
