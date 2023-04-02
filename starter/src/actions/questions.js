import { saveQuestion, saveQuestionAnswer } from "../utils/api"; 
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addQuestionUser, addAnswerUser } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

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

function addAnswer(author, qid, answer) {
    return {
        type: ADD_ANSWER,
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

export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer(authedUser, qid, answer)
        .then(() => {
            dispatch(addAnswer(authedUser, qid, answer));
            dispatch(addAnswerUser(authedUser, qid, answer));
        })
        .then(() => dispatch(hideLoading()));
    };
}