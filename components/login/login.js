import React,{Component} from "react";
import axios from "axios";
import "./login.css";
import Swal from "sweetalert2";

class Login extends Component{

  state={
    emails:[],
    passwords:[],
    email:"",
    password:""
  }

  // componentDidMount(){
  //   axios.get("http://localhost:5000/login/")
  //     .then(response=>{
  //       if(response.data.length>0)
  //       {
  //           //console.log(response.data);
  //           this.setState({
  //               emails:response.data.map(key=>key.email),
  //               passwords:response.data.map(el=>el.password)
  //           })
  //       }
  //
  //     })
  //
  // }

  onSetemail=(event)=>{
    let email=event.target.value;
    this.setState({email:email})
  }

  onSetpassword=(event)=>{
    let password=event.target.value;
    this.setState({password:password})
  }

  onSubmitdetails=(event)=>{
    event.preventDefault();

    const userdetails={
      email:this.state.email,
      password:this.state.password
    }

    console.log(userdetails);

    axios.post("http://localhost:5000/login/find",userdetails)
    .then(response=>{
      console.log(response);
      if(response.data==="Email does not exist")
      {
        Swal.fire("Error","Email does not exist,Please Register").then(()=>window.location.href="/register")
      }
      else if(response.data==="Password does not match")
      {
        Swal.fire("Error","Password does not match").then(()=>this.setState({password:""}))
      }
      else
      {
        window.localStorage.setItem("_id",response.data._id)
        Swal.fire("Success","Logged In").then(()=>window.location.href="/")
      }
    }).catch(err=>{
      console.log(err);
      Swal.fire("User does not exist please register")
      //.then(()=>window.location.href="/register")
    })

  }



  render()
  {
    return (
      <div>
        <form>
          <input className="logininput" placeholder="Email" onChange={this.onSetemail}></input>
          <input className="logininput" placeholder="Password" onChange={this.onSetpassword}></input>
          <button className="loginbtn" onClick={this.onSubmitdetails}>SignIn</button>
          </form>
          </div>
      )
  }

}

export default Login;
