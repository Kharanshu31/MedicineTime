import React,{Component} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import "./course.css";
import SingleCourse from "./SingleCourse/SingleCourse";
import Swal from "sweetalert2";

class Course extends Component{

  state={
    users:[{
      id:"",
      name:"",
      time:"",
    }],
    loading:true
  }

  componentDidMount(){

  //   const query=new URLSearchParams(this.props.location.search);
  //   const newArr=[];
  //   for(let key of query.entries()){
  //   //  console.log(key);
  //     newArr.push(key[1]);
  //   }
  //
  // //  console.log(newArr);
  //   this.setState({names:newArr})

  const id=window.localStorage.getItem("_id")
  console.log(id);
  if(id === null || id.length === 0)
  {
    Swal.fire("Please login before adding medicine");
  }
  else
  {
    axios.get(`http://localhost:5000/user/find?id=${id}`)
      .then(response=>{
              //console.log(response.data[0].name);
              let newArr=[];
              for(let i=0;i<response.data.length;i++)
              {
                //Use i
                newArr.push({id:response.data[i]._id,name:response.data[i].name,time:response.data[i].time})
                //console.log(response.data[i]._id + "  " + response.data[i].name + "  " + response.data[i].time);
              }
              this.setState({
                users:newArr,
                loading:false
              })
      })
  }

  }


  render(){

    // console.log(this.props);
    // console.log(this.state.users.length);
    let medicineCourse=null;
    if(this.state.users.length>0)
    {
      medicineCourse=this.state.users.map(el=>{
        //console.log(el);
        return <SingleCourse key={el.id} medicineName={el.name} medicineTime={el.time}/>
      })
    }
  return (
    <div>
    {this.state.loading ? (
        <div style={{marginTop: 'auto',textAlign: 'center'}}>
          <h1>Please wait...</h1>
        </div>
    ) : (
      <div className="Course">
        {medicineCourse}
      </div>
      )
    }

    </div>
  )
}
}


export default withRouter(Course);
