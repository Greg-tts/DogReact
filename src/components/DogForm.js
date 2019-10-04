import React from 'react';

class DogForm extends React.Component{
  constructor(){
    super()
    this.state={
      name:"",
      breed:"",
      age:0
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
    })
  }
  render(){
    return(
      <div>
        <input type="text" onInput={this.onNameInput} placeholder="Name of dog"/>
        <input type="text" onInput={this.onBreedInput} placeholder="Breed of dog"/>
        <input type="number" onInput={this.onAgeInput} placeholder="Age of dog"/>
        <button onClick={this.handleClick}>Submit Dog</button>
      </div>
    )
  }
}

export default DogForm;