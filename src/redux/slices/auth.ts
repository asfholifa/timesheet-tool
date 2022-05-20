import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@redux/store";

interface AuthState {
  userEmail: string;
  userName: string;
  isAuth: boolean;
  role: "User" | "PMO" | null;
}

const initialState: AuthState = {
  userEmail: "",
  userName: "",
  isAuth: false,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      ...action.payload,
    }),
    clear: () => initialState,
  },
});

export const { setAuth, clear } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
