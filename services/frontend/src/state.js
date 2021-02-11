import jQuery from 'jquery';
import { options } from '../../backend/routes/users';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
export const state = {};
state.page = "home"; //update based off of url of page
state.user = 1; //update based off of url of page

const pages = {
  home: { name: "Home", page: "/" },
  usersQuizzes: { name: "My Quizzes", page: "/my-quizzes" },
  browse: { name: "Browse Quizzes", page: "/browse" },
  logout: { name: "Logout", page: "/" },
  login: { name: "Login", page: "/" }
};

events.getNavPages = () => {
  let pagesToReturn = [];
  if (state.user) {
    pagesToReturn = ["home", "usersQuizzes", "browse", "logout"];
  } else {
    pagesToReturn = ["home", "usersQuizzes", "login"];
  }
  return pagesToReturn.map((item) => [pages[item], item]).map((item) => {
    const newItem = item[0];
    newItem.shortName = item[1];
    return newItem;
  });
};

events.changePage = (args) => {
  state.page = args.data.page;
  console.log(state);
};

// get all the quizzes
events.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return response;
  });
};

// get the quiz by id
events.getQuiz = (quiz_id) => {
  $.getJSON(`/api/quiz-maker/${quiz_id}`, (response) => {
    state.specificQuiz = response;
    console.log('response is', response);
    return response;
  });
};

events.getQuestionsByQuiz = (quiz_id) => {
  $getJSON(`/api/quiz-taker/questions/${quiz_id}`, response => {
    state.questions = response;
    console.log('questions are', response);
    return response;
  })
};

// get a quiz question
events.getQuestion = (question_id) => {
  $.getJSON('/api/quiz-taker/question/:id', response => {
    state.question = response;
    return response;
  })
};

// get all quizz options for a question
events.getOptions = (question_id) => {
  $.getJSON('/api/quiz-taker/options/:id', response => {
    state.options = options;
    return options;
  })
};

const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data });
  };
})();

export default updateState;
