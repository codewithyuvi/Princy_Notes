import React, { useState } from "react";
import axios from "axios";

function UploadPdf() {
  const [showNotesInput, setShowNotesInput] = useState(false);
    const [message, setMessage] = useState("");

  function checkType(e) {
    const selected = e.target.value;
    setShowNotesInput(selected === "notes");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileName", e.target.fileName.value);
    formData.append("fileType", e.target.type.value);
    formData.append("fileUrl", e.target.pdf.files[0]);

    if(e.target.type.value === "notes"){
        formData.append("unitName", e.target.unitName.value);
        formData.append("subjectId", e.target.subjectId.value);
    }

    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/uploadFile`, 
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
        setShowNotesInput(false);
        console.log(res.data);
        setMessage(e.target.fileName.value + " " + res.data.message);
    } catch(err){
        if(err.response && err.response.data){
            setMessage(err.response.data.message || "Kismat Kharab")
        }
        else{
            setMessage("err")
        }
    }
  }



  return (
    <div className="d-inline-flex flex-column">
      <h1>Upload Pdf</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type">Enter File Name</label>
          <input
            type="text"
            name="fileName"
            className="form-control mb-3"
            placeholder="Enter File Name"
            // value={subject}
            // onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="type" className="d-flex">
            Select Type of Pdf
          </label>

          
            <select name="type" className="selectType" onChange={checkType} required>
              <option value="">Please choose the Type of PDF</option>
              <option value="notes">Notes</option>
              <option value="pyq">PYQ</option>
              <option value="syllabus">Syllabus</option>
            </select>
        
    {showNotesInput && (
          <div className="notesInputs">
            <label htmlFor="type" className="d-flex">
              Enter Unit Name
            </label>
            <input
              type="text"
              name="unitName"
              className="form-control mb-3"
              placeholder="Enter the Unit Name"
            />

            <label htmlFor="subjectId">
              Select the Subject in which you want to upload pdf
            </label>
            <select name="subjectId">
              <option value="">Select the Subject</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>

    )}
          <input type="file" name="pdf" accept=".pdf" className="d-flex" />

          <input className="btn btn-primary" type="submit" value="Submit" required/>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPdf;
