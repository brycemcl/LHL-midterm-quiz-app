import jQuery from 'jquery';
const $ = jQuery;
const events = {
  maker: {},
  taker: {}
};
export let state = {
  quizzes: {},
  quizQuestions: {},
  QuizzesAuthoredByUserId: {},
  QuizzesTakenByUserId: {},
  // containers: {}
};
const clearState = () => {
  state = {
    quizzes: {},
    quizQuestions: {},
    QuizzesAuthoredByUserId: {},
    QuizzesTakenByUserId: {}
  };
};
const maker = events.maker;
const taker = events.taker;
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
  console.debug("updateUrl: ", state);
};
if (!state.page) {
  updateUrl();
}
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
    response.forEach((quiz, index) => {
      state.recentQuizzes[index]["created_at"] = new Date(quiz.created_at);
    });
    console.debug("events.getRecentQuizzes: ", state);
    return state.recentQuizzes;
  });
};

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

// get all quiz options for a question
events.getOptions = (argsObject) => {
  const { quizId, questionNumber, questionDb, } = argsObject;
  return $.getJSON(`/api/quiz-taker/options/${questionDb}`, options => {
    if (options) {
      state.quizQuestions[quizId][questionNumber]["options"] = options;
      console.debug("events.getOptions: ", state);
      return state.quizQuestions[quizId][questionNumber]["options"];
    } else {
      console.debug("events.getOptions: ", state);
      console.error("events.getOptions: failed no questions returned");
      return null;
    }
  });
};

events.getQuestionsByQuiz = (quizId) => {
  return $.getJSON(`/api/quiz-taker/questions/${quizId}`, questions => {
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

maker.getQuizzesAuthoredByUserIdCreated = (userId) => {
  return $.getJSON(`/api/quiz-maker/user/${userId}`, (quizzes) => {
    state.QuizzesAuthoredByUserId[userId] = [];
    quizzes.forEach((quiz, index) => {
      state.QuizzesAuthoredByUserId[userId].push(quiz);
      state.QuizzesAuthoredByUserId[userId][index]["created_at"] = new Date(quiz.created_at);
    });
    console.debug("maker.getQuizzesAuthoredByUserIdCreated : ", state);
    return state.QuizzesAuthoredByUserId[userId];
  });
};

/*
/////////////NOT SURE WHAT THE POINT OF THIS IS///////////////////
maker.getQuizById = (quiz_id) => {
  return $.getJSON(`/api/quiz-maker/${quiz_id}`, (response) => {
    console.log(response)
    // state.specificQuiz = response;
    // return response;
  });
};
*/
maker.getQuizById = events.getQuiz;
/* stretch
maker.editQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/quiz',
    method: 'POST',
    data: quiz
  })
    .then(() => {
      console.log('Success!');
    });
};
*/



maker.editQuestion = (question) => {
  console.log(question);
  $.ajax({
    url: '/api/quiz-maker/question',
    method: 'POST',
    data: question
  })
    .then((res) => {
      console.debug("maker.editQuestion ", res);
      clearState();
    });
};

// maker.editQuestion({
//   id: 4, //quiz id
//   question: 7,//question id
//   sub_text: "This is a test",
//   question_pic_url: "https://i.imgur.com/JopLc0X.jpg",
// });

maker.editOption = (option) => {
  $.ajax({
    url: '/api/quiz-maker/option',
    method: 'POST',
    data: option
  })
    .then((res) => {
      console.debug("maker.editOption ", res);
      clearState();
    });
};
// maker.editOption({
//   question_id: 7,
//   id: 10, //option id
//   text_answer: "Here thee is a test answer",
//   pic_answer_url: "https://i.imgur.com/kGkPqZe.jpeg",
//   is_correct: true,
// });

maker.addQuiz = (quiz) => {
  $.ajax({
    url: '/api/quiz-maker/',
    method: 'POST',
    data: quiz
  })
    .then((res) => {
      console.debug("maker.addQuiz ", res);
      clearState();
    });
};
/*
maker.addQuiz({
  user_id: 2,
  title: "Let us create a quiz from the frontend",
  is_public: false,
  is_current: true,
  questions: [
    {
      question: "Is it fun to use glue for hairspray?",
      sub_text: "I don't think so.",
      question_pic_url: "https://static01.nyt.com/images/2021/02/07/multimedia/07xp-gorillaglue/07xp-gorillaglue-jumbo.jpg?quality=90&auto=webp",
      options: [
        {
          pic_answer_url: null,
          text_answer: "No",
          is_correct: true
        },
        {
          pic_answer_url: null,
          text_answer: "Yes",
          is_correct: false
        }
      ]
    },
    {
      question: "Is Cats a good movie?",
      sub_text: "There are worse things.",
      question_pic_url: "https://media.vanityfair.com/photos/5e27310def889c00087c7928/4:3/w_1776,h_1332,c_limit/taylor-swift-cats.jpg",
      options: [
        {
          pic_answer_url: "https://media.vanityfair.com/photos/5e27310def889c00087c7928/4:3/w_1776,h_1332,c_limit/taylor-swift-cats.jpg",
          text_answer: "No",
          is_correct: true
        },
        {
          pic_answer_url: "https://s01.sgp1.cdn.digitaloceanspaces.com/article/133874-zhudebnztb-1577901144.jpeg",
          text_answer: "Yes",
          is_correct: false
        }
      ]
    }
  ]
});
*/
maker.deleteQuiz = (quiz_id) => {
  $.ajax({
    url: `/api/quiz-maker/${quiz_id}/delete`,
    method: 'POST'
  })
    .then((res) => {
      console.debug("maker.deleteQuiz ", res);
      clearState();
    });
};
// maker.deleteQuiz(6);

taker.getQuizzesTakenByUser = (userId) => {
  $.getJSON(`'/api/quiz-taker/user/${userId}`, (quizzes) => {
    state.QuizzesTakenByUserId[userId] = [];
    quizzes.forEach((quiz, index) => {
      state.QuizzesTakenByUserId[userId].push(quiz);
      state.QuizzesTakenByUserId[userId][index]["created_at"] = new Date(quiz.created_at);
    });
    console.debug("taker.getQuizzesTakenByUser : ", state);
    return state.QuizzesTakenByUserId[userId];
  });
};


// taker.getQuizzesTakenByUser(2);

taker.getQuizById = events.getQuiz;
/*
taker.editAnswer = (answer, option_id) => {
  const data = { 'answer': answer, 'option': option_id };
  $.ajax({
    url: `/api/quiz-taker/${answer.quiz_id}/answer`,
    method: 'POST',
    data: data
  })
    .then(() => {
      console.log('Answer updated successfully');
    });
};

taker.editAnswer({
  answer: 1,
  option_id: 2
});
*/
/*
taker.editAnswer = (data) => {
  const data = { answer, 'option': option_id };
  $.ajax({
    url: `/api/quiz-taker/${answer.quiz_id}/answer`,
    method: 'POST',
    data: data
  })
    .then(() => {
      console.log('Answer updated successfully');
    });
};
*/
/*
maker.editOption = (option) => {
  $.ajax({
    url: '/api/quiz-maker/option',
    method: 'POST',
    data: option
  })
    .then((res) => {
      console.debug("maker.editOption ", res);
      clearState();
    });
};
*/
// maker.editOption({
//   question_id: 7,
//   id: 10, //option id
//   text_answer: "Here thee is a test answer",
//   pic_answer_url: "https://i.imgur.com/kGkPqZe.jpeg",
//   is_correct: true,
// });


















// events.quizListContainerLoaded = (data) => {
//   const { quizListContainer, quizListElement } = data;
//   state.containers.quizListContainer = quizListContainer;
//   state.containers.quizListElement = quizListElement;
//   console.log($(state.containers.quizListContainer).remove());


// };



const updateState = (() => {
  return (action) => {
    const { actionType, data = null } = action;
    return events[actionType](data);
  };
})();

export default updateState;

/*
events.getRecentQuizzes();
events.getQuiz(4);
// //single question back
events.getQuestionsByQuiz(4);
// //multiple questions back
events.getQuestionsByQuiz(6);
maker.getQuizzesAuthoredByUserIdCreated(2);
*/
