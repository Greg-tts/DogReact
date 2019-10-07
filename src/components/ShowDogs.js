import React from 'react';

class ShowDogs extends React.Component{
  dogHandleClick=(id)=>{
    fetch('http://localhost:8080/dog/' + id, {
      method: 'delete',
    }).then(()=>{
      this.props.getDataFromAPI();
    })
  }
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
        <div key={dog.id}>
          ID: {dog.id},
          Name: {dog.name}, 
          Breed: {dog.breed}, 
          Age: {dog.age}
          <button onClick={()=>this.dogHandleClick(dog.id)}>Delete Dog</button>
        </div>
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