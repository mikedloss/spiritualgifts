import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from "react-redux";
import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";

import questionsReducer from "./questions/reducer";
import surveyReducer from "./survey/reducer";
import resultsReducer from "./results/reducer";

const rootReducer = combineReducers({
  questions: questionsReducer,
  survey: surveyReducer,
  results: resultsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const configureStore = initialState => {
  let store;

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["survey"]
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
  }

  return store;
};

export default configureStore;
