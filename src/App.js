import React, { Component } from 'react';
import { api } from './api'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TitleBar from './containers/TitleBar';
import Navi from './containers/Navi';
import Browse from './containers/Browse';
import Quiz from './components/Quiz';
import MyAccount from './containers/MyAccount';
import SignUp from './containers/SignUp'
import Leaderboard from './containers/Leaderboard';
import QuizScore from './components/QuizScore';


//Fetch calls here

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {}
      },   
      allQuizzes: []
    }
  };

  componentDidMount(){
    this.getQuizzes()
    window.addEventListener('beforeunload', this.onUnmount, false)
  }
  
  onUnmount = () => {
    localStorage.removeItem("token")
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount, false);
    this.onUnmount();
  }

  getQuizzes() {
    api.quizzes.getQuizzes().then(data =>
      this.setState({
        allQuizzes: data
      })
    );
  }

  authenticateUser(data){
    const token = localStorage.getItem("token");
    console.log("Authenticate user")
    if (token) {
        this.setState({ auth: {user: data.user}});
      }
  }

  logoutUser() {
    localStorage.removeItem("token")
    this.setState({
      auth: {user: {}}
    })
  }

  render() {
    return(
      <Router>
        <div>
          <Navi
          onAuthenticate={this.authenticateUser.bind(this)} 
          onLogout={this.logoutUser.bind(this)}
          />
          <Route 
            exact path="/" 
            render={() => <TitleBar currentTitle="Home Page"/>} 
          />

          <Route
            exact path="/account"
            render={()=> <MyAccount user={this.state.auth.user}/>}
          />

          <Route 
            exact path="/browse"
            render={() => <Browse allQuizzes={this.state.allQuizzes}/>}
          />
          
          <Route 
            path={'/browse/:category'}
            render={props => <Browse {...props} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === props.category)}/>}
          />
          <Route
            exact path={'/signup'}
            render={props => <SignUp {...props} />}
          />
          <Route 
            path={'/quizzes/:id'}
            render={props => <Quiz {...props} thisQuiz={props.match.url} />}
          />

          <Route 
            exact path="/leaderboard"
            render={() => <Leaderboard allQuizzes={this.state.allQuizzes}/>}
          />

          <Route 
            path={'/leaderboard/:id'}
            render={props => <QuizScore {...props} thisQuiz={props.match.url} />}
          />

        </div>
      </Router>
    )
  };
};



export default App;
