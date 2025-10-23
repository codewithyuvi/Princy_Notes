import React, { useEffect, useState } from "react";
import axios from "axios";

function AllSyllabus() {
  const [syllabus, setSyllabus] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    fetchSyllabus();
  }, []);

  async function fetchSyllabus() {
    try {
      const queryParams = {
        type: "syllabus",
      };
      // console.log(queryParams);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
        { params: queryParams }
      );
      // console.log(res.data.data);

      setSyllabus(res.data.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "can't GET");
      } else {
        setMessage("error");
      }
    }
  }

  return (
    <div className="d-inline-flex flex-column">
      <h1>All Uploaded Syllabus PDF's</h1>
      <ol>
        {syllabus.length > 0 ? (
          syllabus.map((i, n) => (
            <li key={n}>
              <a href={i.fileUrl} target="_blank">
                {i.fileName}
              </a>
            </li>
          ))
        ) : (
          <li>No PDF Found</li>
        )}
      </ol>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AllSyllabus;
