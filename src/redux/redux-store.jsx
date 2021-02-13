import { applyMiddleware, combineReducers, createStore } from "redux";
import tilesReducer from "./tiles-reducer";
import thunkMiddleware from "redux-thunk";


let store = createStore(tilesReducer, applyMiddleware(thunkMiddleware));

export default store;