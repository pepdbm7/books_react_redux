import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getBookDetails, IBookState} from '../../redux/bookSlice';
import { RootState } from "../../redux/store";
import SweetAlert from 'sweetalert2-react';



interface IBook {
  id?: string,
  link?: string,
  price?: number,
  title?: string,
}

interface Iprops {
    id: string,
    close: ()=>{}
}


const BookDetails = ({id, close}:Iprops) => {
  const book = useSelector((state: RootState): IBookState => state.book.book);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBookDetails(id))
  }, [])

  return (
    <SweetAlert
    show={!!id}
    title={book && book.title}
    text={book && book.author}
    grow
    showConfirmButton={false}
    showCloseButton
    />
  );
}


export default BookDetails