import React,{Component} from "react";
import "./course.css";

class Course extends Component{

  state={
    names:[],
    time:[]
  }

  componentDidMount(){
    const query=new URLSearchParams(this.props.location.search);
    const newArr=[];
    for(let key of query.entries()){
    //  console.log(key);
      newArr.push(key[1]);
    }

  //  console.log(newArr);
    this.setState({names:newArr})
  }

  render(){
  return (
    <div>
    <div className="Course">
      <h1>Name 1:{this.state.names}</h1>
    </div>

    </div>
  )
}
}


export default Course;
