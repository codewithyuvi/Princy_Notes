import React, {useContext} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import AddNewSubject from "./AddNewSubject.jsx";
import UploadPdf from "./UploadPdf.jsx"
import AllPyq from "./AllPyq.jsx"
import AllNotes from "./AllNotes.jsx"
import AllSyllabus from "./AllSyllabus.jsx"
import { AuthContext } from "../AuthContext";

function AdminPortal(){
  const { authenticated } = useContext(AuthContext);
      if(authenticated){
    return (
        <div>
            {/* <h1>Admin Portal</h1>     */}
            <Sidebar/>   
            <Routes>
                <Route path="/" element={<p className="d-inline-flex">Select an option from the sidebar</p>}></Route>
                <Route path="addNewSubject" element={<AddNewSubject/>} />
                <Route path="uploadPdf" element={<UploadPdf/>} />
                <Route path="all-pyqs" element={<AllPyq/>} />
                <Route path="all-notes" element={<AllNotes/>} />
                <Route path="all-syllabus" element={<AllSyllabus/>} />

            </Routes>
            <Outlet/>
                
                
        </div>
    )}
}
export default AdminPortal;