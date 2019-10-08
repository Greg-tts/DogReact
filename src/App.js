import React from 'react';
import './App.css';
import DogForm from './components/DogForm';
import ShowDogs from './components/ShowDogs';
import ShowDog from './components/ShowDog';
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
                <Link id="show_dogs" to="/">Show Dogs</Link>
              </li>
              <li>
                <Link id="create_dog" to="/create">Create Dog</Link>
              </li>
            </ul>
          </nav>
          <div id="content_body">
            <Switch>
              <Route path="/dog/:id" render={(props)=>(
                <ShowDog {...props} getDataFromAPI={this.getDataFromAPI}/>
              )}/>
              <Route path="/edit/dog/:id" render={(props)=>(
                <DogForm {...props} getDataFromAPI={this.getDataFromAPI}/>
              )}/>
              <Route path="/create">
                <DogForm getDataFromAPI={this.getDataFromAPI} />
              </Route>
              <Route exact path="/">
                <ShowDogs getDataFromAPI={this.getDataFromAPI} dogs={this.state.dogs}/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;