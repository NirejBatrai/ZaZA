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

let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(appleMiddleware(...middleware))
);

export default store;
