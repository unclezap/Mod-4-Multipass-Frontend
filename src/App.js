import React, { Component } from 'react';
import { api } from './api'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
}

    // window.addEventListener('beforeunload', this.onUnmount, false)
  
  
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
    this.setState({multipass: multipassBackground})
    alert ("MULTIPASSS MODE")
}

  authenticateUser(data){
    const token = localStorage.getItem("token");
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

  updateAllQuizzes(data) {

    this.setState((prev) => ({auth: prev.auth, allQuizzes: [...prev.allQuizzes, data], multipass: prev.multipass}
    ))
  }

  render() {

    return(
      <div>

        <Router>
        <Navi
          onAuthenticate={this.authenticateUser.bind(this)} 
          onLogout={this.logoutUser.bind(this)}
          />
        <div style={this.state.multipass}>
      <Switch>

          <Route path="/account">
            <MyAccount user={this.state.auth.user} myQuizzes={this.state.allQuizzes.filter(quiz => quiz.user_id === this.state.auth.user.id)}/>
          </Route>

          {/* not using this route currently <Route path={'/browse/:category'}
           render={({match}) => <Browse checkForMultipass={this.state.multipass.background} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === match.params.category)}/>}
          /> */}
          
          <Route path="/browse/"
            render={({match}) => <Browse match={match} allQuizzes={this.state.allQuizzes} styleProps={this.state.multipass}/>}
          />

          <Route path={'/popular'} >
            <Popular allQuizzes={this.state.allQuizzes}/>
          </Route>

          <Route path={'/signup'}>
            <SignUp easterEgg={this.changeBodyBg.bind(this)} />
          </Route>

          <Route path={'/quizzes/:id'}
            render={({match}) => <Quiz match={match} checkForMultipass={this.state.multipass.background}/>}
          />

          <Route path={'/leaderboard/:id'}
            render={({match}) => <QuizScore match={match} thisQuiz={match.params.id} />}
          />

          <Route path="/leaderboard" >
            {({match}) => {
              if (match.isExact) {
                return <Leaderboard match={match} allQuizzes={this.state.allQuizzes}/>
              } else {
                return null
              }
            }
              }
          </Route>

          <Route path="/new_quiz">
            <NewQuiz quizMade={this.updateAllQuizzes.bind(this)}/>
          </Route>
          
          <Route exact path="/"> 
            <TitleBar currentTitle="Home Page"/>
          </ Route>
          <div style={this.state.multipass}></div>
          <div style={this.state.multipass}></div>
          <div style={this.state.multipass}></div>
      </Switch>
      </div>
      </Router>
      </div>
    )
  };
};



export default App;
