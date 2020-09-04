import React,{Component,Fragment} from "react";
import axios from "axios";
import "./medicine.css";
import {NavLink,Redirect,withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

class Medicine extends Component {

  state={
      names:[],
      times:[],
      time:"",
      name:"",
      username:"",
      isLoggedIn:false
  }

  componentDidMount(){

    const id=window.localStorage.getItem("_id")
    console.log(id);
    if(id === null || id.length === 0)
    {
      console.log("false");
      this.setState({
        isLoggedIn:false
      })
    }
    else
    {
      console.log("true");
      axios.get(`http://localhost:5000/login/getUser?id=${window.localStorage.getItem("_id")}`)
        .then(response=>{
            if(response.data)
            {
                console.log(response.data);
                this.setState({
                  isLoggedIn:true
                })
            }
        })
    }

  }

  submitname=()=>{
    // console.log(this.props);
    this.props.history.push("/login");
  }

  handleChangeUsername=(event)=>{
    let username=event.target.value;
    this.setState({username:username});
  }

  handleChangeName=(event)=>{
    let medicine=event.target.value;
    this.setState({name:medicine});
  }

  handleChangeTime=event=>{
    let time=event.target.value;
    this.setState({time:time})
  }

  onsetMedicine=(event)=>{

   event.preventDefault();

   if(this.state.name ==="" || this.state.time==="")
   {
     //alert("Please fill all the fields")
     Swal.fire("Error","Please fill all the fields")
     return;
   }

  const userItems={
    name:this.state.name,
    time:this.state.time,
    username:this.state.username
  }

  const id=window.localStorage.getItem("_id")

  if(id === null || id.length === 0)
  {
    Swal.fire("Please login before adding medicine");
  }
  else
  {
    // axios.post("http://localhost:5000/user/add",userItems)
    //   .then(res=>console.log(res.data))
    //     .catch(error=>console.log(error.response));

    axios.post(`http://localhost:5000/user/add?id=${id}`,userItems)
      .then(res=>console.log(res.data))
        .catch(error=>console.log(error.response));


      this.props.history.push("/course");
  }

  // this.setState({names:newArray},()=>{
  //   const queryparam=[];
  //   for(let i in this.state.names){
  //     queryparam.push("name="+encodeURIComponent(this.state.names[i]))
  //   }
  //   const queryString=queryparam.join("&");
  //   this.props.history.push({
  //     pathname:"/course",
  //     search:"?"+queryString
  //   })
  // })

  }

  render(){
        //   <div className="Navbar">
        //   <ul className="NavigationItems">
        //     <li className="NavigationItem">
        //       <nav>
        //         <NavLink to="/course" activeClassName="active">Course</NavLink>
        //         <NavLink to="/login" activeClassName="active">Login</NavLink>
        //       </nav>
        //     </li>
        //   </ul>
        // </div>
        //

    const authLinks=(
      <Fragment>
        <a href="#" className="loginLink" onClick={(e)=>{
            e.preventDefault();
            window.localStorage.removeItem("_id");
            window.location.href="/";
        }}>Logout</a>
      </Fragment>
    )

    const guestLinks=(
      <Fragment>
        <NavLink to="/login" activeClassName="active loginLink">Login</NavLink>
        <NavLink to="/register" activeClassName="active loginLink">Register</NavLink>
      </Fragment>
    )

    return(
      <div className="whole">

      <div className="container">

      <li className="NavigationItem">
        <nav>
          <NavLink to="/course" activeClassName="active">Course</NavLink>
          {this.state.isLoggedIn ? (authLinks) : (guestLinks) }
        </nav>
      </li>


          <div>
            <h1 className="heading">MEDICINE TIME</h1>
            <input className="Username" placeholder="Name" onChange={this.handleChangeUsername}/>
            <button className="Userbtn" onClick={this.submitname}>Submit</button>
          </div>
      </div>

    <div className="InfoContainer DirectionContainer">

      <div className="InputContainer">
      <h3>Enter the Medicine Name</h3>
      <input className="Info" onChange={this.handleChangeName}></input>
      </div>

      <div className="InputContainer">
      <h3>Enter the Time</h3>
      <input className="Info" onChange={this.handleChangeTime}></input>
      </div>

    </div>

      <button className="login" onClick={this.onsetMedicine}>Submit</button>

      </div>
    )
  }
}
export default withRouter(Medicine);
