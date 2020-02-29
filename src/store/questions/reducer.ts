import {
  QuestionActionTypes,
  SET_LOADING,
  GET_ALL_QUESTIONS_SUCCESS,
  GET_ALL_QUESTIONS_ERROR
} from "./types";
import { Question } from "../../types";

interface QuestionsState {
  error: string | null;
  questions: Question[];
  loading: boolean;
}

const initialState: QuestionsState = {
  error: null,
  questions: [],
  loading: false
};

const questionsReducer = (
  state = initialState,
  action: QuestionActionTypes
): QuestionsState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case GET_ALL_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload, error: null };
    case GET_ALL_QUESTIONS_ERROR:
      return { ...state, error: action.payload, questions: [] };
    default:
      return state;
  }
};

export default questionsReducer;
