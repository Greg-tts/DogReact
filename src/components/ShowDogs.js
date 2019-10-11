import React from 'react';
import { Link } from "react-router-dom";

class ShowDogs extends React.Component{
  deleteAllDogs=()=>{
    fetch('https://vast-harbor-17269.herokuapp.com/dogs/', {
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
    let messageIfEmpty="";
    if(dogElementArr.length===0){
      messageIfEmpty = "No dogs found";
    }
    return (
      <div>
        {messageIfEmpty}
        <div>{dogElementArr}</div>
      </div>
    );
  }
}

export default ShowDogs;