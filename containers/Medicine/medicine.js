import React,{Component} from "react";
import axios from "axios";
import qs from "qs";
import "./medicine.css";
import { Route, Switch,NavLink,withRouter} from 'react-router-dom';
import Course from "../../components/course/course";
// import Button from "../../components/UI/Button/Button";
// import Input from "../../components/UI/Input/Input";

class Medicine extends Component {

  state={
      names:[],
      times:[],
      time:"",
      name:""
  }

  componentDidMount(){

    axios.get("http://localhost:5000/user/")
      .then(response=>{
          if(response.data.length>0)
          {
              console.log(response.data);
              this.setState({
                names:response.data.map(key=>key.name),
              })
          }
      })
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

  const newArray=[...this.state.names];

  newArray.push(this.state.name+" ");

  const userItems={
    name:this.state.name
  }

  let axiosConfig = {
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Access-Control-Allow-Origin": "*",
  }
};



// var params = new URLSearchParams();
// params.append("name",this.state.name);
// console.log(params);

  axios.post("http://localhost:5000/user/add",userItems)
    .then(res=>console.log(res))
      .catch(error=>console.log(error.response));


//   axios({
//     method: 'post',
//     url: '/user/add',
//     data:{
//     name:this.state.name
//   }
// }).then(response=>console.log(response.data))
//   .catch(err=>console.log(err));

  this.setState({names:newArray},()=>{
    const queryparam=[];
    for(let i in this.state.names){
      queryparam.push("name="+encodeURIComponent(this.state.names[i]))
    }
    const queryString=queryparam.join("&");
    this.props.history.push({
      pathname:"/course",
      search:"?"+queryString
    })
  })




  }

  render(){

    return(
      <div className="whole">

      <div className="Navbar">
      <ul className="NavigationItems">
        <li className="NavigationItem">
          <nav>
            <NavLink to="/course" activeClassName="active">Course</NavLink>
          </nav>
        </li>
      </ul>
    </div>


      <div className="container">



          <div>
            <h1 className="heading">MEDICINE TIME</h1>
            <input className="Username" placeholder="Name"/>
            <button>Submit</button>
          </div>
      </div>

    <div className="InfoContainer">

      <div className="InputContainer">
      <h3 >Enter the Medicine Name</h3>
      <input className="Info" onChange={this.handleChangeName}></input>
      <button className="login" onClick={this.onsetMedicine}>Go</button>
      </div>

      <div className="InputContainer">
      <h3>Enter the Time</h3>
      <input className="Info" onChange={this.handleChangeTime}></input>
      <button className="login">Go</button>
      </div>

    </div>

      </div>
    )
  }
}
export default withRouter(Medicine);
