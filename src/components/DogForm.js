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
    fetch('https://vast-harbor-17269.herokuapp.com/dog', {
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
    fetch('https://vast-harbor-17269.herokuapp.com/dog/' + this.state.id, {
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
  componentDidMount(){
    let id = this.props.match ? this.props.match.params.id : 0;
    this.setState({ id });
  }
  render(){
    let buttonAction;
    if( this.state.id ){
      buttonAction = <button onClick={this.handleUpdateClick}>Update Dog</button>
    } else {
      buttonAction = <button onClick={this.handleCreateClick}>Create Dog</button>
    }
    return(
      <div>
        <input type="text" value={this.state.name} onChange={this.onNameInput} placeholder="Name of dog"/>
        <input type="text" value={this.state.breed} onChange={this.onBreedInput} placeholder="Breed of dog"/>
        <input type="number" value={this.state.age} onChange={this.onAgeInput} placeholder="Age of dog"/>
        <Link to="/">{ buttonAction }</Link>
      </div>
    )
  }
}

export default DogForm;