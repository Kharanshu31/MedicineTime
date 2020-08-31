import React,{Component} from "react";
import axios from "axios";
import "./login.css";

class Login extends Component{

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
      password:this.state.password
    }

    axios.post("http://localhost:5000/login/add",userdetails)
      .then(response=>console.log(response.data))
      .catch(err=>console.log(err.response))

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
