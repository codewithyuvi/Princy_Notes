import React from "react";

function UploadPdf() {

  function checkType() {
    console.log(document.getElementsByClassName("selectType")[0].value);
    if (document.getElementsByClassName("selectType")[0].value === "notes") {
        document.getElementsByClassName("notesInputs")[0].style.display = "block"
    }
    else{
        document.getElementsByClassName("notesInputs")[0].style.display = "none"
    }
  }

  return (
    <div className="d-inline-flex flex-column">
      <h1>Upload Pdf</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="type">Enter File Name</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter File Name"
            // value={subject}
            // onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="type" className="d-flex">
            Select Type of Pdf
          </label>
          <select name="type" className="selectType" onChange={checkType}>
            <option value="">Please choose the Type of PDF</option>
            <option value="notes">Notes</option>
            <option value="pyq">PYQ</option>
            <option value="syllabus">Syllabus</option>
          </select>

          <div className="notesInputs" style={{ display: "none" }}>
            <label htmlFor="type" className="d-flex">
              Enter Unit Name
            </label>
            <input
              type="text"
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
          <input type="file" accept=".pdf" className="d-flex" />

          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default UploadPdf;
