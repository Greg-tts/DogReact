import React from 'react';
import './App.css';
import DogForm from './components/DogForm';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      dogs:[]
    }
  }

  getDataFromAPI=()=>{
    fetch("http://localhost:8080/dogs")
    .then((res) => res.json())
    .then((response)=>{
      this.setState({dogs:response});
    });
  }
  dogHandleClick=(id)=>{
    fetch('http://localhost:8080/dog/' + id, {
      method: 'delete',
    }).then(()=>{
      this.getDataFromAPI();
    })
  }

  componentDidMount(){
    this.getDataFromAPI();
  }
  render(){
    let dogElementArr = this.state.dogs.map((dog)=>{
      return(
        <div key={dog.id}>
          Name: {dog.name}, 
          Breed: {dog.breed}, 
          Age: {dog.age}
          <button onClick={()=>this.dogHandleClick(dog.id)}>Delete Dog</button>
        </div>
      ) 
    })

    return (
      <div>
        <div>{dogElementArr}</div>
        <DogForm getDataFromAPI={this.getDataFromAPI} />
      </div>
    );
  }
}

export default App;
