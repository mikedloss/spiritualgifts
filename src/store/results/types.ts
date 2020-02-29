import { SummarizedResults } from "../../types";

export const SET_LOADING = "SET_LOADING";
export const SAVE_RESULTS = "SAVE_RESULTS";
export const GET_RESULT_SUCCESS = "GET_RESULT_SUCCESS";
export const GET_RESULT_ERROR = "GET_RESULT_ERROR";

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SaveResults {
  type: typeof SAVE_RESULTS;
  payload: SummarizedResults;
}

export interface GetResultSuccess {
  type: typeof GET_RESULT_SUCCESS;
  payload: SummarizedResults;
}

export interface GetResultError {
  type: typeof GET_RESULT_ERROR;
  payload: any;
}

export type ResultActionTypes =
  | SetLoading
  | SaveResults
  | GetResultSuccess
  | GetResultError;
