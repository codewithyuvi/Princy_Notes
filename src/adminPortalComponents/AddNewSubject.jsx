import React from "react";

function AddNewSubject(){
    
    return (
        <div className="d-inline-flex">

            <div className="">
                <h1>Add New Subject</h1>

                <div class=" mb-3">
                    <input type="text" class="form-control mb-3" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    <input class="btn btn-primary" type="submit" value="Submit"></input>
                </div>
            </div>
        </div>
    )
}

export default AddNewSubject