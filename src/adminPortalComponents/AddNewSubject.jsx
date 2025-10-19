import React, { useState } from "react";
import axios from "axios";

function AddNewSubject(){
    
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault(); // prevents reloading
        try{
            const res = await axios.post("http://localhost:8000/api/v1/admin/createSubject", {
                subjectName: subject,
            });
            setMessage(res.data.message)
            setSubject("")
        } catch(err){
            console.error(err);
            setMessage("Error addind subject")
        }
    }
    
    return (
        <div className="d-inline-flex">

            <div className="">
                <h1>Add New Subject</h1>

                <form onSubmit={handleSubmit}>
                    <div class=" mb-3">
                        <input 
                            type="text" 
                            class="form-control mb-3" 
                            placeholder="Enter Subject Name" 
                            value={subject}    
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        
                        <input class="btn btn-primary" type="submit" value="Submit"/>
                    </div>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default AddNewSubject