import { saveQuestion, saveQuestionAnswer } from "../utils/api"; 
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addQuestionUser, addAnswerUser } from "./users";
import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function addAnswerQuestion(author, qid, answer) {
    return {
        type: ADD_ANSWER_QUESTION,
        author,
        qid,
        answer,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch (showLoading());

        return saveQuestion(optionOneText, optionTwoText, authedUser)
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addQuestionUser(question))
        })
        .then(() => dispatch(hideLoading()));
    }
}

/*export function handleAnswerQuestion(questionId, answer){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        //dispatch(showLoading());

        return saveQuestionAnswer(authedUser.id, questionId, answer)
        .then(() => {
            dispatch(addAnswerQuestion(authedUser.id, questionId, answer))
            dispatch(addAnswerUser(authedUser.id, questionId, answer))
        })
        //.then(() => dispatch(hideLoading()));
    }
}*/

export function handleAddAnswer(questionId, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());
        return saveQuestionAnswer(authedUser, questionId, answer)
            .then(() => {
                dispatch(addAnswerQuestion(authedUser, questionId, answer));
                dispatch(addAnswerUser(authedUser, questionId, answer));
            })
            .then(() => dispatch(hideLoading()));
    };
}

/*export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
      const  { authedUser } = getState();
      dispatch(showLoading());
  
      return saveQuestionAnswer({
        authedUser,
        qid,
        answer
      })
        .then(() => { 
          dispatch(addAnswerQuestion({qid, answer, authedUser}))
          dispatch(addAnswerUser({qid, answer, authedUser}))
        })  
        .then(() => dispatch(hideLoading()));
    }
  }*/
