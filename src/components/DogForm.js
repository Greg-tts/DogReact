import React from 'react';

class DogForm extends React.Component{
  constructor(){
    super()
    this.state={
      name:"",
      breed:"",
      age:null
    }
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
  handleClick=()=>{
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
  render(){
    return(
      <div>
        <input type="text" value={this.state.name} onInput={this.onNameInput} placeholder="Name of dog"/>
        <input type="text" value={this.state.breed} onInput={this.onBreedInput} placeholder="Breed of dog"/>
        <input value={this.state.age} onInput={this.onAgeInput} placeholder="Age of dog"/>
        <button onClick={this.handleClick}>Submit Dog</button>
      </div>
    )
  }
}

export default DogForm;