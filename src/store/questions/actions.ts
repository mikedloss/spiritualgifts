import axios from "axios";

import * as ActionTypes from "./types";
import { Question } from "../../types";

export function setLoading(status: boolean): ActionTypes.SetLoading {
  return {
    type: ActionTypes.SET_LOADING,
    payload: status
  };
}

export function getAllQuestions() {
  return dispatch => {
    dispatch(setLoading(true));
    axios
      .get("/api/questions")
      .then(response => {
        const { questions } = response.data;
        dispatch(getAllQuestionsSuccess(questions));
      })
      .catch(error => dispatch(getAllQuestionsError(error)))
      .finally(() => dispatch(setLoading(false)));
  };
}

export function getAllQuestionsSuccess(
  data: Question[]
): ActionTypes.GetAllQuestionsSuccess {
  return {
    type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
    payload: data
  };
}

export function getAllQuestionsError(
  error: any
): ActionTypes.GetAllQuestionsError {
  return {
    type: ActionTypes.GET_ALL_QUESTIONS_ERROR,
    payload: error
  };
}
