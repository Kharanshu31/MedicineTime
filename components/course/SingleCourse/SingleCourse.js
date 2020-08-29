import React,{Component,useState} from "react";
import "./SingleCourse.css";
import axios from "axios";
import Swal from "sweetalert2";

const SingleCourse=(props)=>{
  return (
    <div className="Single">

      <div>
        <h3 style={{marginTop: 10,marginLeft: 5}}>Name: {props.medicineName}</h3>
        <h5 style={{marginTop: 10,marginLeft: 5,marginBottom: 2}}>Time: {props.medicineTime}</h5>
      </div>

      <div>
        <button className="removeBtn" onClick={async(e)=>{
          e.preventDefault();
          console.log("123");

          const data={
            medicine_name:props.medicineName
          }

          console.log(data);

          await axios.delete(`http://localhost:5000/user/${props.medicineName}`)
          .then(response=>{
            console.log(response);
            if(response.data==="Successfully deleted")
            {
              //alert("Deleted X")
              Swal.fire("Successfully deleted").then(()=>window.location.href="/course")
            }
          })

        }}>Remove</button>
      </div>

    </div>
  )
}

export default SingleCourse;
