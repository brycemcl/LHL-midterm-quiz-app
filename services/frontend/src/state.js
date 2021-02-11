import jQuery from 'jquery';
const $ = jQuery;
const qs = Document.querySelector;
const events = {};
export const state = {};
state.user = 1; //update based off of url of page

const pages = {
  home: { name: "Home", page: "/" },
  usersQuizzes: { name: "My Quizzes", page: "/my-quizzes" },
  browse: { name: "Browse Quizzes", page: "/browse" },
  logout: { name: "Logout", page: "/" },
  login: { name: "Login", page: "/" }
};
const updateUrl = () => {
  state.page = Object.keys(pages).filter((item) => {
    return pages[item].page === window.location.pathname.split("/")[1] ? window.location.pathname.split("/")[1] : "/";
  })[0];
};
updateUrl();
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
  history.pushState(state, "", pages[args.data.page]["page"]);
  updateUrl();
  state.page = args.data.page;
};

// get all the quizzes
events.getRecentQuizzes = () => {
  $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    return state.recentQuizzes;
  });
};

// events.getRecentQuizzes();

// get the quiz by id
// setting the states of quiz_id, quiz_title, and is_current
events.getQuiz = (quiz_id) => {
  $.getJSON(`/api/quiz-maker/${quiz_id}`, (response) => {
    state.quiz_id = response[0].id;
    state.quiz_title = response[0].title;
    state.quiz_current = response[0].is_current;
    console.log(state);
    // console.log('response', response[0]);
    // console.log('response id and quiz title', state.quiz_id, state.quiz_title, state.quiz_current);
  });
};

events.getQuiz(5);

events.getQuestionsByQuiz = (quiz_id) => {
  $.getJSON(`/api/quiz-taker/questions/${quiz_id}`, response => {
    console.log('questions are', response);
    // console.log('current state', state);
    console.log('quiz id', quiz_id, state.quiz_id);
    if (state.quiz_id) {
      for (const question of response) {
        console.log("question is", question);
        state.question_id = {};
        state.question_id.question = question.question;
        state.question_id.question_pic_url = question.question_pic_url;
        state.question_id.sub_text = question.sub_text;
      }
      console.log('res:', state[quiz_id][response.id]);
    }
    // return state[quiz_id][response.id];
  });
};

// events.getQuestionsByQuiz(5);

// get a quiz question
events.getQuestion = (question_id) => {
  $.getJSON(`/api/quiz-taker/question/${question_id}`, response => {
    state.question = response;
    if (state[response.quiz_id]) {
      state[response.quiz_id] = {};
    }
    return state[response.quiz_id][question_id];
  });
};

// events.getQuestions(7);

// get all quiz options for a question
events.getOptions = (question_id) => {
  $.getJSON(`/api/quiz-taker/options/${question_id}`, response => {
    state.question_id = response;
    return state.question_id;
  });
};

const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data });
  };
})();
setInterval(() => {
  console.info(state);
}, 5000);
export default updateState;
