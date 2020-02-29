import { Question } from "../../types";

export const SET_LOADING = "SET_LOADING";
export const GET_ALL_QUESTIONS_SUCCESS = "GET_ALL_QUESTIONS_SUCCESS";
export const GET_ALL_QUESTIONS_ERROR = "GET_ALL_QUESTIONS_ERROR";

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface GetAllQuestionsSuccess {
  type: typeof GET_ALL_QUESTIONS_SUCCESS;
  payload: Question[];
}

export interface GetAllQuestionsError {
  type: typeof GET_ALL_QUESTIONS_ERROR;
  payload: any;
}

export type QuestionActionTypes =
  | SetLoading
  | GetAllQuestionsSuccess
  | GetAllQuestionsError;
