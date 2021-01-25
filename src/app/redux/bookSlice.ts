import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store";
import axios from "axios";
import { DatabaseURL } from "../App";

interface IError {
  type: string;
  text: string;
}

export interface IBookDetails {
  author: string;
  id: string;
  image: string;
  link: string;
  price: number;
  title: string;
  description?: string;
}

export interface IBookState {
  bookDetails: IBookDetails;
  bookError: IError;
  isLoadingList: boolean;
}
export const initialBookDetails: IBookDetails = {
  author: "",
  id: "",
  image: "",
  link: "",
  price: 0,
  title: "",
};

const initialState: IBookState = {
  bookDetails: initialBookDetails,
  bookError: { type: "", text: "" },
  isLoadingList: true,
};

interface GetDetailsresponse {
  bookDetails: Array<object>;
  bookError: object;
}

export const Book = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookDetails: (
      state: RootState,
      action: PayloadAction<GetDetailsresponse>
    ) => {
      state.bookDetails = action.payload.bookDetails;
      state.bookError = action.payload.bookError;
    },
    setDetailsLoader: (state: RootState, action: PayloadAction<boolean>) => {
      state.isLoadingList = action.payload;
    },
    clearBookDetails: (state: RootState) => {
      state.bookDetails = initialBookDetails;
      state.bookError = { type: "", text: "" };
    },
  },
});

export const {
  setBookDetails,
  setDetailsLoader,
  clearBookDetails,
} = Book.actions;

export const getBookDetails = (id: string): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(setDetailsLoader(true));

  return axios
    .get(`${DatabaseURL}/items/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then(({ data = {} }) => {
      setTimeout(() => {
        dispatch(setDetailsLoader(false));
        dispatch(
          setBookDetails({
            bookDetails: data,
            bookError: data.id
              ? {}
              : { type: "danger", text: "No details found" },
          })
        );
      }, 800);
      //settimeout just to show that there is a loader implemented
    })
    .catch((err) => {
      dispatch(setDetailsLoader(false));
      dispatch(
        setBookDetails({
          bookDetails: [],
          bookError: { type: "danger", text: err.message },
        })
      );
    });
};

export const clearBookDetailsAction = () => (dispatch: AppDispatch) =>
  dispatch(clearBookDetails());

export const setDetailsLoaderAction = (boolean: boolean) => (
  dispatch: AppDispatch
) => dispatch(setDetailsLoader(boolean));

export default Book.reducer;
