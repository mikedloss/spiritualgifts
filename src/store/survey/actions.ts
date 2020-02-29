import axios from "axios";

import * as ActionTypes from "./types";
import { Answer } from "../../types";

export function setLoading(status: boolean): ActionTypes.SetLoading {
  return {
    type: ActionTypes.SET_LOADING,
    payload: status
  };
}

export function saveAnswer(answer: Answer): ActionTypes.AnswerQuestion {
  return {
    type: ActionTypes.ANSWER_QUESTION,
    payload: answer
  };
}

export function clearSavedProgress(
  currentId: number
): ActionTypes.ClearSavedProgress {
  return {
    type: ActionTypes.CLEAR_SAVED_PROGRESS,
    payload: currentId
  };
}

export function submitAnswers(answers: Answer[]) {
  return dispatch => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url: "/api/answers/submit",
      headers: {
        "Content-type": "application/json"
      },
      data: answers
    })
      .then(response => {
        const results = response.data;
        dispatch(setLoading(false));
        dispatch(submitAnswersSuccess(results));
      })
      .catch(error => {
        dispatch(submitAnswersError(error));
      });
  };
}

export function submitAnswersSuccess(
  results: any
): ActionTypes.SubmitAnswersSuccess {
  console.log("action -> results :", results);
  return {
    type: ActionTypes.SUBMIT_ANSWERS_SUCCESS,
    payload: results
  };
}

export function submitAnswersError(error: any): ActionTypes.SubmitAnswersError {
  return {
    type: ActionTypes.SUBMIT_ANSWERS_ERROR,
    payload: error
  };
}

export function resetState(): ActionTypes.ResetState {
  return {
    type: ActionTypes.RESET_STATE
  };
}
