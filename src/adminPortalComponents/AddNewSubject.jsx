import React, { useEffect, useState } from "react";
import axios from "axios";

function AddNewSubject() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getSubjects"
      );
      setSubjects(res.data.data);
    } catch (err) {
      console.error(err);
      setMessage("Error getting subjects");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reloading
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/createSubject",
        {
          subjectName: subject,
        }
      );
      setMessage(res.data.message);
      setSubject("");
      fetchSubjects(); // refresh list
    } catch (err) {
        if(err.response && err.response.data){
            setMessage(err.response.data.message || "Something went ");  
        }
        else{
            setMessage("erorr")
        }
    }
  };

  return (
    <div className="d-inline-flex flex-column">
      <div className="">
        <h1>Add New Subject</h1>

        <form onSubmit={handleSubmit}>
          <div className=" mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
      <div>
        <h1>All Subjects</h1>
        <ol>
          {subjects.length > 0 ? (
            subjects.map((i, n) => <li key={n}>{i.subjectName}</li>)
          ) : (
            <p>No subjects found</p>
          )}
        </ol>
      </div>
    </div>
  );
}

export default AddNewSubject;
