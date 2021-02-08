import { combineReducers, createStore } from "redux";
import tilesReducer from "./tiles-reducer";


let store = createStore(tilesReducer);

export default store;