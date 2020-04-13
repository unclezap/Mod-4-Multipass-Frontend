import React, { Component } from 'react';
import TitleBar from './containers/TitleBar';
import NavBar from './containers/NavBar';
import ShowPage from './containers/ShowPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

//Fetch calls here

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      activePage: "browse"
    }
  };

  render() {
    return(
      <Router>
        <div>
          <TitleBar currentTitle="Home Page"/>
          <NavBar />
          {/* Route to different views */}
          <ShowPage activePage={this.state.activePage}/>
        </div>
      </Router>
    )
  };
};



export default App;
