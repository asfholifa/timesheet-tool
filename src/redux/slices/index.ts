import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@redux/slices/app";
import authReducer from "@redux/slices/auth";

const rootReducer = {
  auth: authReducer,
  app: appReducer,
};

export default function createReducer(injectedReducers = {}) {
  const reducer = combineReducers({
    ...rootReducer,
    ...injectedReducers,
  });

  return reducer;
}
