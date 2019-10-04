import React from 'react';
import './App.css';


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

  render(){
    console.log(this.state.name, this.state.breed, this.state.age);
    return(
      <div>
        <input onInput={this.onNameInput} placeholder="Name of dog"/>
        <input onInput={this.onBreedInput} placeholder="Breed of dog"/>
        <input onInput={this.onAgeInput} placeholder="Age of dog"/>
        <button>Submit Dog</button>
      </div>
    )
  }
}


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      dogs:[]
    }
  }
  componentDidMount(){
    fetch("http://localhost:8080/dogs")
    .then((res) => res.json())
    .then((response)=>{
      this.setState({dogs:response});
    });
  }
  render(){
    let dogElementArr = this.state.dogs.map((dog)=>{
      return <div key={dog.id}>Name: {dog.name}, Breed: {dog.breed}, Age: {dog.age}</div>
    })

    return (
      <div>
        <div>{dogElementArr}</div>
        <DogForm />
      </div>
    );
  }
}

export default App;
