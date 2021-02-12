import jQuery from 'jquery';
const $ = jQuery;
const events = {
  maker: {},
  taker: {}
};
export const state = {
  quizzes: {},
  quizQuestions: {}
};
const maker = events.maker;
const taker = events.taker;
state.user = 1; //update based off of url of page
// import { takerEvents } from './takerStateFunctions';

const pages = {
  home: { name: "Home", page: "/" },
  usersQuizzes: { name: "My Quizzes", page: "/my-quizzes" },
  browse: { name: "Browse Quizzes", page: "/browse" },
  logout: { name: "Logout", page: "/" },
  login: { name: "Login", page: "/" }
};
// console.debug(window.location.pathname.split("/")[1]);
const updateUrl = () => {
  state.page = Object.keys(pages).filter((item) => {
    return pages[item].page === window.location.pathname.split("/")[1] ? window.location.pathname.split("/")[1] : "/";
  })[0];
  console.debug("updateUrl: ", state);
};
updateUrl();
events.getNavPages = () => {
  let pagesToReturn = [];
  if (state.user) {
    pagesToReturn = ["home", "usersQuizzes", "browse", "logout"];
  } else {
    pagesToReturn = ["home", "usersQuizzes", "login"];
  }
  pagesToReturn = pagesToReturn.map((item) => [pages[item], item]).map((item) => {
    const newItem = item[0];
    newItem.shortName = item[1];
    return newItem;
  });

  console.debug("events.getNavPages: ", state);
  return pagesToReturn;
};

events.changePage = (args) => {
  history.pushState(state, "", pages[args.data.page]["page"]);
  updateUrl();
  state.page = args.data.page;
  console.debug("events.changePage: ", state);
};
// get all the quizzes
events.getRecentQuizzes = () => {
  return $.getJSON('/api/', (response) => {
    state.recentQuizzes = response;
    console.debug("events.getRecentQuizzes: ", state);
    return state.recentQuizzes;
  });
};
// events.getRecentQuizzes();

// get the quiz by id
// setting the states of quizId, quiz_title, and is_current
events.getQuiz = (quizId) => {
  return $.getJSON(`/api/quiz-maker/${quizId}`, (response) => {
    if (response[0]) {
      const quiz = response[0];
      state.quizzes.quizId = quiz.id;
      state.quizzes[quiz.id] = quiz;
      state.quizzes[quiz.id]["created_at"] = new Date(quiz.created_at);
      console.debug("events.getRecentQuizzes: ", state);
      return state.quizzes[quiz.id];
    } else {
      console.debug("events.getQuiz: ", state);
      console.error("events.getQuiz: failed no quiz returned");
      return null;
    }
  });
};
// events.getQuiz(4);

// get all quiz options for a question
events.getOptions = (argsObject) => {
  const { quizId, questionNumber, questionDb, } = argsObject;
  $.getJSON(`/api/quiz-taker/options/${questionDb}`, options => {
    if (options) {
      state.quizQuestions[quizId][questionNumber]["options"] = options;
      console.debug("events.getOptions: ", state);
      return state.quizQuestions[quizId][questionNumber]["options"];
    } else {
      console.debug("events.getOptions: ", state);
      console.error("events.getOptions: failed no questions returned");
    }
  });
};

events.getQuestionsByQuiz = (quizId) => {
  $.getJSON(`/api/quiz-taker/questions/${quizId}`, questions => {
    if (questions) {
      state.quizQuestions[quizId] = [];
      questions.forEach((questionDb, questionNumber) => {
        state.quizQuestions[quizId].push(questionDb);
        events.getOptions({ questionDb: questionDb.id, quizId, questionNumber });
      });
      console.debug("events.getQuestionsByQuiz: ", state);
      return state.quizQuestions[quizId];
      //empty response
    } else {
      console.debug("events.getQuestionsByQuiz: ", state);
      console.error("events.getQuestionsByQuiz: failed no questions returned");
      return null;
    }
  });
};
// //single question back
// events.getQuestionsByQuiz(4);
// //multiple questions back
events.getQuestionsByQuiz(6);

/*
/////////////NOT SURE WHAT THE POINT OF THIS IS///////////////////
// get a quiz question
events.getQuestion = (questionId) => {
  $.getJSON(`/api/quiz-taker/question/${questionId}`, response => {
    state.question = response;
    if (state[response.quizId]) {
      state[response.quizId] = {};
    }
    return state[response.quizId][questionId];
  });
};
// events.getQuestions(7);
*/

maker.getQuizzesByUserIdCreated = (user_id) => {
  $.getJSON(`/api/quiz-maker/user/${user_id}`, (quizzes) => {
    quizzes.forEach(quiz => {
      console.log(quiz);
    });
    // state.quizzesCreated = response;
    // return response;
  });
};
maker.getQuizzesByIdCreated(2);

const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType]({ data });
  };
})();

export default updateState;
