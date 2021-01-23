import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store";

interface IError {
  type: string;
  text: string;
}

export interface IAuthState {
  isAuthorized: boolean;
  loginError: IError;
  isLoadingLogin?: boolean;
}

const initialState: IAuthState = {
  isAuthorized: false,
  loginError: { type: "", text: "" },
  isLoadingLogin: false,
};

export interface ILoginCredentials {
  username: string;
  password: string;
}

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: RootState, action: PayloadAction<IAuthState>) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.loginError = action.payload.loginError;
    },
    setLoginLoader: (state: RootState, action: PayloadAction<boolean>) => {
      state.isLoadingLogin = action.payload;
    },
    logout: (state: RootState) => {
      state.isAuthorized = false;
    },
  },
});

export const { login, setLoginLoader, logout } = Auth.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAction = (credentials: ILoginCredentials): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(setLoginLoader(true));

  if (
    credentials.username === "usertest" &&
    credentials.password === "secret"
  ) {
    setTimeout(() => {
      dispatch(
        login({ isAuthorized: true, loginError: { type: "", text: "" } })
      );

      dispatch(setLoginLoader(false));
    }, 1500);
  } else {
    setTimeout(() => {
      dispatch(
        login({
          isAuthorized: false,
          loginError: { type: "danger", text: "Wrong credentials" },
        })
      );
      dispatch(setLoginLoader(false));
    }, 500);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;

export default Auth.reducer;
