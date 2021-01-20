import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from "axios"
import { DatabaseURL } from "../../App";


interface ListState {
  list: Array<object>,
  listError: object
  isLoadingList: boolean
}

interface GetListresponse {
  list: Array<object>,
  listError: object
}

const initialState: ListState = {
  list: [],
  listError: {},
  isLoadingList: true
};

export const List = createSlice({
  name: 'list',
  initialState,
  reducers: {
    getAllBooks: (state, action: PayloadAction<GetListresponse>) => {
      debugger
        state.list = action.payload.list
     state.listError = action.payload.listError
    },
    setListLoader: (state, action: PayloadAction<boolean>) => {
state.isLoadingList = action.payload
    }
  },
});

export const { getAllBooks, setListLoader} = List.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAllBooksAsync = (amount: number): AppThunk => dispatch => {
  dispatch(setListLoader(true))
    return axios
    .post(`${DatabaseURL}/items`, {
      method: "POST",
      // headers: {
      //   "access-token": token,
      // },
    })
    .then(({ data= [] }) => {
      dispatch(getAllBooks({list: data, listError: data.length ? {} : {text: "No books found"}}));
      dispatch(setListLoader(false));
    })
    .catch((err) => {
      dispatch(getAllBooks({list: [], listError: {text: err.message}}));
      dispatch(setListLoader(false));
    });

};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectList = (state: RootState) => state.list.list;

export default List.reducer;
