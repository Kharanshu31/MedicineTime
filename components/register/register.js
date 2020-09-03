import React,{Component} from "react";
import axios from "axios";
import "./register.css";
import Swal from "sweetalert2";

class Register extends Component{

  state={
    emails:[],
    passwords:[],
    email:"",
    password:""
  }

  componentDidMount(){
    axios.get("http://localhost:5000/login/")
      .then(response=>{
        if(response.data.length>0)
        {
            //console.log(response.data);
            this.setState({
                emails:response.data.map(key=>key.email),
                passwords:response.data.map(el=>el.password)
            })
        }

      })

  }

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
      password:this.state.password,
      isLoggedIn:true
    }

    axios.post("http://localhost:5000/login/add",userdetails)
      .then(response=>
        {
          console.log(response);
          window.localStorage.setItem("_id",response.data._id)
          Swal.fire("Success","Created Account").then(()=>window.location.href="/")
          //window.localStorage.setItem('_id',response.data._id)
          //window.localStorage.setItem("_id","5f12e78eaed88351b044b195")
          //console.log(response.data)
        })
      .catch(err=>console.log(err.response))

  }

  render()
  {
    return (
      <div>
        <form>
          <input className="logininput" placeholder="Email" onChange={this.onSetemail}></input>
          <input className="logininput" placeholder="Password" onChange={this.onSetpassword}></input>
          <button className="loginbtn2" onClick={this.onSubmitdetails}>Register</button>
          </form>
          </div>
      )
  }

}

export default Register;
