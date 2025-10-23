import React, { useEffect, useState } from "react";
import axios from "axios";

function AllPyq() {
  const [pyqs, setPyqs] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    fetchPyq();
  }, []);

  async function fetchPyq() {
    try {
      const queryParams = {
        type: "pyq",
      };
      // console.log(queryParams);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
        { params: queryParams }
      );
      // console.log(res.data.data);

      setPyqs(res.data.data);
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
      <h1>All Uploaded PYQ's</h1>
      <ol>
        {pyqs.length > 0 ? (
          pyqs.map((i, n) => (
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

export default AllPyq;
