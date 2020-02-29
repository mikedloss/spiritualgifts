import { Answer } from "../../types";

export const SET_LOADING = "SET_LOADING";
export const SET_FINISHED = "SET_FINISHED";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const CLEAR_SAVED_PROGRESS = "CLEAR_SAVED_PROGRESS";
export const SUBMIT_ANSWERS_SUCCESS = "SUBMIT_ANSWERS_SUCCESS";
export const SUBMIT_ANSWERS_ERROR = "SUBMIT_ANSWERS_ERROR";
export const RESET_STATE = "RESET_STATE";

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetFinished {
  type: typeof SET_FINISHED;
  payload: boolean;
}

export interface AnswerQuestion {
  type: typeof ANSWER_QUESTION;
  payload: Answer;
}

export interface ClearSavedProgress {
  type: typeof CLEAR_SAVED_PROGRESS;
  payload: number;
}

export interface SubmitAnswersSuccess {
  type: typeof SUBMIT_ANSWERS_SUCCESS;
}

export interface SubmitAnswersError {
  type: typeof SUBMIT_ANSWERS_ERROR;
  payload: any;
}

export interface ResetState {
  type: typeof RESET_STATE;
}

export type AnswerActionTypes =
  | SetLoading
  | SetFinished
  | AnswerQuestion
  | ClearSavedProgress
  | SubmitAnswersSuccess
  | SubmitAnswersError
  | ResetState;
