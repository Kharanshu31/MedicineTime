import React from "react";
import "./SingleCourse.css";

const SingleCourse=(props)=>{
  return (
    <div className="Single">
      <h3 style={{marginTop: 10,marginLeft: 5}}>Name:{props.medicineName}</h3>
      <h5 style={{marginTop: 10,marginLeft: 5,marginBottom: 2}}>Time:{props.medicineTime}</h5>
    </div>
  )
}

export default SingleCourse;
