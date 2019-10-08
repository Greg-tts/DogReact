import React from 'react';
import { Link } from "react-router-dom";

class ShowDogs extends React.Component{
  deleteAllDogs=()=>{
    fetch('http://localhost:8080/dogs/', {
      method: 'delete',
    }).then(()=>{
      this.props.getDataFromAPI();
    })
  }
  render(){
    let dogElementArr = this.props.dogs.map((dog)=>{
      return(
        <Link to={"/dog/" + dog.id} key={dog.id}>
          <div>
            ID: {dog.id},
            Name: {dog.name}, 
            Breed: {dog.breed}, 
            Age: {dog.age}
          </div>
        </Link>
      ) 
    })
    return (
      <div>
        <button onClick={this.deleteAllDogs}>Delete All Dogs</button>
        <div>{dogElementArr}</div>
      </div>
    );
  }
}

export default ShowDogs;