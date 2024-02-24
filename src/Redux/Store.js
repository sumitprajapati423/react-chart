import { createStore } from "redux";
import AllReducers from "./CombineReducer";

const store = createStore(AllReducers);

export default store;