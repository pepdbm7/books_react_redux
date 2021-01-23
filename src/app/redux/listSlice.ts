import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store";
import axios from "axios";
import { DatabaseURL } from "../App";

interface ListState {
  list: Array<object>;
  listError: object;
  isLoadingList: boolean;
}

const initialState: ListState = {
  list: [],
  listError: {},
  isLoadingList: true,
};

interface GetListresponse {
  list: Array<object>;
  listError: object;
}

export const List = createSlice({
  name: "list",
  initialState,
  reducers: {
    getAllBooks: (state: RootState, action: PayloadAction<GetListresponse>) => {
      state.list = action.payload.list;
      state.listError = action.payload.listError;
    },
    setListLoader: (state: RootState, action: PayloadAction<boolean>) => {
      state.isLoadingList = action.payload;
    },
  },
});

export const { getAllBooks, setListLoader } = List.actions;

export const getAllBooksAsync = (offset?: number, count?: number): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(setListLoader(true));
  return axios
    .get(`${DatabaseURL}/items`, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        offset: 0,
        count: 5,
      },
    })
    .then(({ data = [] }) => {
      dispatch(
        getAllBooks({
          list: data,
          listError: data.length ? {} : { text: "No books found" },
        })
      );
      dispatch(setListLoader(false));
    })
    .catch((err) => {
      dispatch(getAllBooks({ list: [], listError: { text: err.message } }));
      dispatch(setListLoader(false));
    });
};

export const selectList = (state: RootState) => state.list.list;

export default List.reducer;
