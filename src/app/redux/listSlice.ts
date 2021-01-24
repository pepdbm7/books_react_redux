import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store";
import axios from "axios";
import { DatabaseURL } from "../App";
import { IBookDetails } from "./bookSlice";

export interface IListItem {
  id: string;
  link: string;
  price: number;
  title: string;
}

export type IList = Array<IListItem | IBookDetails> | [];
interface ListState {
  list: IList;
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

// @ts-ignore
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
    addBook: (state: RootState, action: PayloadAction<IBookDetails>) => {
      state.list = [action.payload.newBook, ...state.list];
    },
    clearList: (state: RootState) => {
      state.list = [];
    },
  },
});

export const { getAllBooks, setListLoader, addBook, clearList } = List.actions;

export const getAllBooksAsync = (offset?: number, count?: number): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(setListLoader(true));
  // ;
  return axios
    .get(`${DatabaseURL}/items`, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        offset,
        count,
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

export const addBookAction = (newBook: IBookDetails) => (
  dispatch: AppDispatch
) => {
  dispatch(setListLoader(true));
  setTimeout(() => {
    dispatch(addBook(newBook));
    dispatch(setListLoader(false));
  }, 800);
};

export const clearListAction = () => (dispatch: AppDispatch) =>
  dispatch(clearList());

export const selectList = (state: RootState) => state.list.list;

export const selectListLoader = (state: RootState) => state.list.isLoadingList;

export default List.reducer;
