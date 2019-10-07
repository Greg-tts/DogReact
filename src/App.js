import React from 'react';
import './App.css';
import DogForm from './components/DogForm';
import ShowDogs from './components/ShowDogs';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const About=()=>{
  return <h2>About</h2>;
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
                <Link to="/">Show Dogs</Link>
              </li>
              <li>
                <Link to="/create">Create Dog</Link>
              </li>
              <li>
                <Link to="/update">Update Dog</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/update">
              <DogForm action="update" getDataFromAPI={this.getDataFromAPI} />
            </Route>
            <Route path="/create">
              <DogForm action="create" getDataFromAPI={this.getDataFromAPI} />
            </Route>
            <Route exact path="/">
              <ShowDogs getDataFromAPI={this.getDataFromAPI} dogs={this.state.dogs}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;