import axios from "axios";
import Router from "next/router";

import * as ActionTypes from "./types";
import { Answer } from "../../types";
import { saveResults } from "../results/actions";

export function setLoading(status: boolean): ActionTypes.SetLoading {
  return {
    type: ActionTypes.SET_LOADING,
    payload: status
  };
}

export function setFinished(status: boolean): ActionTypes.SetFinished {
  return {
    type: ActionTypes.SET_FINISHED,
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

export function submitAnswers(answers: Answer[], docId: string) {
  return dispatch => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url: "/api/results/submit",
      headers: {
        "Content-type": "application/json"
      },
      data: {
        answers,
        docId
      }
    })
      .then(response => {
        const results = response.data;
        dispatch(setFinished(true));
        dispatch(setLoading(false));
        Router.push(`/results/${docId}`);
      })
      .catch(error => {
        dispatch(submitAnswersError(error));
      });
  };
}

export function submitAnswersSuccess(): ActionTypes.SubmitAnswersSuccess {
  return {
    type: ActionTypes.SUBMIT_ANSWERS_SUCCESS
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
