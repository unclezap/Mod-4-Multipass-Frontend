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
import multi from './IMG/multi.gif'

const multipassBackground = {
   
  backgroundImage: `url(${multi})`
  
}


class App extends Component {


  constructor() {
    super();
    this.state = {
      auth: {
        user: {}
      },   
      allQuizzes: [],
      multipass: {background: "white"}
    }
  };

  componentDidMount(){
    this.getQuizzes()

    // window.addEventListener('beforeunload', this.onUnmount, false)
  }
  
  onUnmount = () => {
    localStorage.removeItem("token")
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

  changeBodyBg(){
    // console.log("hi")
    this.setState({multipass: multipassBackground})
}

  authenticateUser(data){
    const token = localStorage.getItem("token");
    if (token) {
        this.setState({ auth: {user: data.user}});
      }
    // this.changeBodyBg()

  }

  logoutUser() {
    localStorage.removeItem("token")
    this.setState({
      auth: {user: {}}
    })
  }

  updateAllQuizzes(data) {

    this.setState(prev => {
        const newAllQuizzes = prev.allQuizzes
        newAllQuizzes.push(data)
        const oldUser = prev.user
        return {user: oldUser, allQuizzes: newAllQuizzes}
      }
    )
  }

  render() {

    return(
      <Router>
        <div style={this.state.multipass}>
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
            render={() => <Browse allQuizzes={this.state.allQuizzes} styleProps={this.state.multipass}/>}
          />
          
          <Route 
            path={'/browse/:category'}
            render={props => <Browse {...props} checkForMultipass={this.state.multipass.background} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === props.match.params.category)}/>}
          />

          <Route
            path={'/popular'}
            render={() => <Popular allQuizzes={this.state.allQuizzes}/>}
          />

          <Route
            exact path={'/signup'}
            render={props => <SignUp {...props} easterEgg={this.changeBodyBg.bind(this)} />}
          />
          <Route 
            path={'/quizzes/:id'}
            render={props => <Quiz {...props} thisQuiz={props.match.url} checkForMultipass={this.state.multipass.background}/>}
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
          <div style={this.state.multipass} style={{height: "300px"}}></div>
          <div style={this.state.multipass} style={{height: "300px"}}></div>
          <div style={this.state.multipass} style={{height: "300px"}}></div>
        </div>
      </Router>
    )
  };
};



export default App;
