import { createStore, combineReducers, appleMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-dectools/extension";

import {
  userReducerSignIn,
  userReducerSignup,
  userReducerProfile,
  userReducerLogout,
} from "./reducers/userReducer";

//combine reducers
const reducer = combineReducers({
  signUp: userReducerSignup,
  signIn: userReducerSignIn,
  userProfile: userReducerProfile,
  logOut: userReducerLogout,
});

// initial  state

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(appleMiddleware(...middleware))
);

export default store;
