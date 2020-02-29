import axios from "axios";

import * as ActionTypes from "./types";
import { SummarizedResults } from "../../types";

export function setLoading(status: boolean): ActionTypes.SetLoading {
  return {
    type: ActionTypes.SET_LOADING,
    payload: status
  };
}

export function saveResults(
  results: SummarizedResults
): ActionTypes.SaveResults {
  return {
    type: ActionTypes.SAVE_RESULTS,
    payload: results
  };
}

export function getResult(id: string) {
  return dispatch => {
    dispatch(setLoading(true));
    axios
      .get(`/api/results/get?id=${id}`)
      .then(response => {
        const result = response.data;
        dispatch(setLoading(false));
        dispatch(getResultSuccess(result));
      })
      .catch(error => dispatch(getResultError(error)));
  };
}

export function getResultSuccess(
  result: SummarizedResults
): ActionTypes.GetResultSuccess {
  return {
    type: ActionTypes.GET_RESULT_SUCCESS,
    payload: result
  };
}

export function getResultError(error: any): ActionTypes.GetResultError {
  return {
    type: ActionTypes.GET_RESULT_ERROR,
    payload: error
  };
}
