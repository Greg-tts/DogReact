import React from 'react';
import { Link } from "react-router-dom";

class DogForm extends React.Component{
  constructor(){
    super()
    this.state={
      id:0,
      name:"",
      breed:"",
      age:0
    }
  }
  onIdInput=(e)=>{
    this.setState({id: e.target.value});
  }
  onNameInput=(e)=>{
    this.setState({name: e.target.value});
  }
  onBreedInput=(e)=>{
    this.setState({breed: e.target.value});
  }
  onAgeInput=(e)=>{
    this.setState({age: e.target.value});
  }
  handleCreateClick=()=>{
    fetch('http://localhost:8080/dog', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.name, 
        breed: this.state.breed, 
        age:this.state.age
      })
    }).then(()=>{
      this.props.getDataFromAPI();
      this.setState({name:"",breed:"",age:0});
    })
  }
  handleUpdateClick=()=>{
    fetch('http://localhost:8080/dog/' + this.state.id, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.name, 
        breed: this.state.breed, 
        age:this.state.age
      })
    }).then(()=>{
      this.props.getDataFromAPI();
      this.setState({name:"",breed:"",age:0,id:0});
    })
  }
  render(){
    let idInput = "";
    let buttonAction;
    if(this.props.action === "update"){
      idInput = <input type="number" value={this.state.id} onInput={this.onIdInput} placeholder="ID of Dog"/>
      buttonAction = <button onClick={this.handleUpdateClick}>Update Dog</button>
    } else {
      buttonAction = <button onClick={this.handleCreateClick}>Create Dog</button>
    }
    return(
      <div>
        { idInput }
        <input type="text" value={this.state.name} onInput={this.onNameInput} placeholder="Name of dog"/>
        <input type="text" value={this.state.breed} onInput={this.onBreedInput} placeholder="Breed of dog"/>
        <input type="number" value={this.state.age} onInput={this.onAgeInput} placeholder="Age of dog"/>
        <Link to="/">{ buttonAction }</Link>
      </div>
    )
  }
}

export default DogForm;