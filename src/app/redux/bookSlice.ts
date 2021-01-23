import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store";
import axios from "axios";
import { DatabaseURL } from "../App";


interface IBookDetails {
  author: string,
  id:string,
  image: string,
  link: string,
  price: number,
  title:string
}

interface IBookState {
  bookDetails: IBookDetails | object;
  bookError: object;
  isLoadingList: boolean;
}

const initialState: IBookState = {
  bookDetails: {},
  bookError: {},
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
    setBookDetails: (state: RootState, action: PayloadAction<GetDetailsresponse>) => {
      state.bookDetails = action.payload.bookDetails;
      state.bookError = action.payload.bookError;
    },
    setDetailsLoader: (state: RootState, action: PayloadAction<boolean>) => {
      state.isLoadingList = action.payload;
    },
  },
});

const {setBookDetails, setDetailsLoader} = Book.actions

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
      // debugger;

      dispatch(
        setBookDetails({
          bookDetails: data,
          bookError: data.id ? {} : { text: "No details found" },
        })
      );
      dispatch(setDetailsLoader(false));
    })
    .catch((err) => {
      dispatch(setBookDetails({ bookDetails: [], bookError: { text: err.message } }));
      dispatch(setDetailsLoader(false));
    });
};

export default Book.reducer;
