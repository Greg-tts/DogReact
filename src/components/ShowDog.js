import React from 'react';
import { Link } from "react-router-dom";

class ShowDog extends React.Component {
  constructor(){
    super()
    this.state={
      dog:{}
    }
  }
  componentDidMount(){
    const { id } = this.props.match.params;
    fetch("https://vast-harbor-17269.herokuapp.com/dog/" + id)
      .then((res) => res.json())
      .then((dogRes) =>{
        this.setState({dog:dogRes});
    })
  }
  dogHandleClick=(id)=>{
    fetch('https://vast-harbor-17269.herokuapp.com/dog/' + id, {
      method: 'delete',
    }).then(()=>{
      this.props.getDataFromAPI();
    })
  }

  render(){
    return(
      <div>
        <div>Id: {this.state.dog.id}</div>
        <div>Name: {this.state.dog.name}</div>
        <div>Breed: {this.state.dog.breed}</div>
        <div>Age: {this.state.dog.age}</div>
        <Link to="/"><button onClick={()=>this.dogHandleClick(this.state.dog.id)}>Delete Dog</button></Link>
        <Link to={"/edit/dog/" + this.state.dog.id}><button>Edit</button></Link>
      </div>
    )
  }
}

export default ShowDog;