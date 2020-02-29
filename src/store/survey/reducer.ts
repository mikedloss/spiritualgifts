import { clone, findIndex, sortBy, uniqBy } from "lodash";

import {
  AnswerActionTypes,
  SET_LOADING,
  ANSWER_QUESTION,
  SUBMIT_ANSWERS_SUCCESS,
  SUBMIT_ANSWERS_ERROR,
  CLEAR_SAVED_PROGRESS,
  RESET_STATE,
  SET_FINISHED
} from "./types";
import { Answer } from "../../types";

export interface SurveyState {
  error: string | null;
  answers: Answer[];
  loading: boolean;
  finished: boolean;
  surveyType: "short" | "wagner-houts";
}

const initialState: SurveyState = {
  error: null,
  answers: [],
  loading: false,
  finished: false,
  surveyType: "short"
};

const surveyReducer = (
  state = initialState,
  action: AnswerActionTypes
): SurveyState => {
  let newAnswers = clone(state.answers);
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_FINISHED: {
      return { ...state, finished: action.payload };
    }
    case ANSWER_QUESTION:
      const existingAnswerIndex = findIndex(
        newAnswers,
        a => a.question === action.payload.question
      );
      if (existingAnswerIndex === -1) {
        newAnswers.push(action.payload);
      } else {
        newAnswers[existingAnswerIndex] = action.payload;
      }
      if (hasDuplicates(newAnswers)) {
        newAnswers = sortBy(newAnswers, ["question"]);
        newAnswers = uniqBy(newAnswers, "question");
      }
      return { ...state, answers: newAnswers };
    case CLEAR_SAVED_PROGRESS:
      // action.payload contains the current question, so we need to remove everything after this given question ID
      // in case the user is in the middle of the survey
      newAnswers = newAnswers.filter(a => a.question < action.payload);
      return { ...state, answers: newAnswers };
    case SUBMIT_ANSWERS_SUCCESS:
      return { ...state, finished: true };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default surveyReducer;

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
