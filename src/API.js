const API_ROOT = 'http://localhost:3000'
//need to change when we go to heroku

const token = () => localStorage.getItem("token")

const headers = () => {
    return {
        "Content-Type":"application/json",
        Accept: "application/json",
        Authorization: token()
    }
}

const getQuizzes = () => {
    return fetch(`${API_ROOT}/quizzes`, {headers: headers()})
    .then(response => response.json())
}

const getQuestions = (quiz_id) => {
    //some sort of logic to determine which questions
    return fetch(`${API_ROOT}/questions/${quiz_id}`, {headers: headers()})
    .then(response => response.json())
}
//might have the answers come through questions in the serializer instead
//leaving in for testing purposes now
const getAnswers = () => {
    return fetch(`${API_ROOT}/answers`, {headers: headers()})
    .then(response => response.json())
}

const getUserScores = () => {
    return fetch(`${API_ROOT}/userscores`, {headers: headers()})
    .then(response => response.json())
}

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
  // console.log("getting current user", headers);
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(res => {
    // console.log(res)
    return res.json();
  });
};

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  quizzes: {
    getQuizzes,
    getQuestions,
    getAnswers,
  },
  scores: {
      getUserScores
  }
};