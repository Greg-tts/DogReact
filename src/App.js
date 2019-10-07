import React from 'react';
import './App.css';
import DogForm from './components/DogForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class DogApp extends React.Component{
  constructor(){
    super()
    this.state = {}
  }
  dogHandleClick=(id)=>{
    fetch('http://localhost:8080/dog/' + id, {
      method: 'delete',
    }).then(()=>{
      this.props.getDataFromAPI();
    })
  }
  render(){
    let dogElementArr = this.props.dogs.map((dog)=>{
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
        <DogForm getDataFromAPI={this.props.getDataFromAPI} />
      </div>
    );
  }
}


const About=()=>{
  return <h2>About</h2>;
}

const Users=()=>{
  return <h2>Users</h2>;
}

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
  componentDidMount(){
    this.getDataFromAPI();
  }
  render(){
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route exact path="/">
              <DogApp getDataFromAPI={this.getDataFromAPI} dogs={this.state.dogs}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;