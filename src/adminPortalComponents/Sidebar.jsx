import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (

    <div className="border border-black d-flex ">
        <div className="border border-blue">
            <div className="border border-red">
                <h1>I am sidebar</h1>
            </div>
            <div>
                <p><Link to="/Admin-Portal/addNewSubject">Add New Subject</Link> </p>
            </div>
            <div>
                <p><Link to="/Admin-Portal/uploadPdf">Upload a New Pdf</Link ></p>
            </div>
            <div>
                <p><Link to="/Admin-Portal/all-pyqs">PYQ's</Link></p>
            </div>
            <div>
                <p><Link to="/Admin-Portal/all-notes">Notes</Link></p>
            </div>
            <div>
                <p><Link to="/Admin-Portal/all-syllabus">Syllabus</Link></p>
            </div>
        </div>
    </div>
    //post- add a new subject button
    //post- upload a new pdf 
    //get + patch uploaded pyq
    //get + patch uploaded syllabus
    //get + patch uploaded notes
    
  );
};

export default Sidebar;