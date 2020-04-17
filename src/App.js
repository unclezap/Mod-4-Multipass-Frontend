import React, { Component } from 'react';
import { api } from './api'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TitleBar from './containers/TitleBar';
import Navi from './containers/Navi';
import Browse from './containers/Browse';
import Popular from './containers/Popular';
import Quiz from './components/Quiz';
import MyAccount from './containers/MyAccount';
import SignUp from './containers/SignUp'
import Leaderboard from './containers/Leaderboard';
import QuizScore from './components/QuizScore';
import NewQuiz from './components/NewQuiz';


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
    if (localStorage.getItem("user")) {
      this.setState({user: localStorage.getItem("user")})

    }
    // window.addEventListener('beforeunload', this.onUnmount, false)
  }
  
  onUnmount = () => {
    // window.history.go(-1)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
  
  componentWillUnmount() {
    // window.removeEventListener('beforeunload', this.onUnmount, false);
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
    if (token) {
      console.log(data[0])
        this.setState({ auth: {user: data.user}});
        localStorage.setItem("user", data.user)
      }
  }

  logoutUser() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.setState({
      auth: {user: {}}
    })
  }

  updateAllQuizzes(data) {
    this.setState(prev => {
        const newAllQuizzes = prev.allQuizzes
        newAllQuizzes.push(data)
        return {allQuizzes: newAllQuizzes}
      }
    )
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
            render={()=> <MyAccount user={this.state.auth.user} myQuizzes={this.state.allQuizzes.filter(quiz => quiz.user_id === this.state.auth.user.id)}/>}
          />

          <Route 
            exact path="/browse"
            render={() => <Browse allQuizzes={this.state.allQuizzes}/>}
          />
          
          <Route 
            path={'/browse/:category'}
            render={props => <Browse {...props} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === props.match.params.category)}/>}
          />

          <Route
            path={'/popular'}
            render={() => <Popular allQuizzes={this.state.allQuizzes}/>}
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

          <Route 
            exact path="/new_quiz"
            render={() => <NewQuiz quizMade={this.updateAllQuizzes.bind(this)}/>}
          />

        </div>
      </Router>
    )
  };
};



export default App;
