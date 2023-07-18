import { combineReducers, createStore } from "redux";
import { formReducer } from "./reducers";

export const rootReducer = combineReducers({ form: formReducer });

export const store = createStore(rootReducer);
