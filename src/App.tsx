import * as React from 'react';
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

export const App: React.FC = () => {
  const [user, setUser] = React.useState({})
  const [quizzes, setQuizzes] = React.useState([])

  // componentDidMount(){
  // this.getQuizzes()
  // }

  // window.addEventListener('beforeunload', this.onUnmount, false)

  // onUnmount = () => {
  //   localStorage.removeItem("token")
  // }

  // componentWillUnmount() {
  //   // window.removeEventListener('beforeunload', this.onUnmount, false);
  //   this.onUnmount();
  // }

  const getQuizzes = () => {
    api.quizzes.getQuizzes().then(data =>
      setQuizzes(data)
    );
  }

  const authenticateUser = (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(data.user)
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    setUser({})
  }

  const updateAllQuizzes = (data) => {
    setQuizzes((prev) => { [...prev, data] })
  }

  return (
    <div>

      <Router>
        <Navi
          onAuthenticate={authenticateUser}
          onLogout={logoutUser()}
        />
        <div>
          <Switch>

            <Route path="/account">
              <MyAccount user={user} myQuizzes={quizzes.filter(quiz => quiz.user_id === user.id)} />
            </Route>

            {/* not using this route currently <Route path={'/browse/:category'}
           render={({match}) => <Browse checkForMultipass={this.state.multipass.background} allQuizzes={this.state.allQuizzes.filter(quiz => quiz.category === match.params.category)}/>}
          /> */}

            <Route path="/browse/"
              render={({ match }) => <Browse match={match} allQuizzes={quizzes} />}
            />

            <Route path={'/popular'} >
              <Popular allQuizzes={quizzes} />
            </Route>

            <Route path={'/signup'}>
              <SignUp />
            </Route>

            <Route path={'/quizzes/:id'}
              render={({ match }) => <Quiz match={match} />}
            />

            <Route path={'/leaderboard/:id'}
              render={({ match }) => <QuizScore match={match} thisQuiz={match.params.id} />}
            />

            <Route path="/leaderboard" >
              {({ match }) => {
                if (match.isExact) {
                  return <Leaderboard match={match} allQuizzes={quizzes} />
                } else {
                  return null
                }
              }
              }
            </Route>

            <Route path="/new_quiz">
              <NewQuiz quizMade={updateAllQuizzes()} />
            </Route>

            <Route exact path="/">
              <TitleBar currentTitle="Home Page" />
            </ Route>
            <div />
            <div />
            <div />
          </Switch>
        </div>
      </Router>
    </div>
  )
};