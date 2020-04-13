import React, { Component } from 'react';
import TitleBar from './containers/TitleBar';
import NavBar from './containers/NavBar'
import Browse from './components/Browse';
import Quiz from './components/Quiz';
import { api } from './api'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

//Fetch calls here

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      allQuizzes: [],
      activePage: "browse"
    }
  };

  componentDidMount(){
    api.quizzes.getQuizzes().then(data => {
      console.log(data);
      this.setState({
        allQuizzes: data
      });
    });

  }

  render() {
    return(
      <Router>
        <div>
          <NavBar />
          <Route 
            path="/" 
            render={() => <TitleBar currentTitle="Home Page"/>} 
          />

          <Route 
            exact path="/browse"
            render={() => <Browse allQuizzes={this.state.allQuizzes}/>}
          />
          
          <Route 
            path={'/browse/:category'}
            render={(props) => <Browse {...props} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === props.category)}/>}
          />

          <Route 
            path={'/quizzes/:id'}
            render={props => <Quiz {...props} thisQuiz={props.match.url} />}
          />

        </div>
      </Router>
    )
  };
};



export default App;
