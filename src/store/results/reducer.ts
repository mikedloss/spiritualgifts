import { SummarizedResults } from "../../types";
import { SET_LOADING } from "../survey/types";
import { SAVE_RESULTS, GET_RESULT_SUCCESS } from "./types";

interface ResultsState {
  error: string | null;
  results: SummarizedResults;
  loading: boolean;
}

const initialState: ResultsState = {
  error: null,
  results: null,
  loading: false
};

const resultsReducer = (state = initialState, action: any): ResultsState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SAVE_RESULTS:
    case GET_RESULT_SUCCESS:
      return { ...state, results: action.payload, loading: false };
    default:
      return state;
  }
};

export default resultsReducer;
