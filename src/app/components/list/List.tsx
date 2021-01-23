import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllBooksAsync,
  selectList,
} from '../../redux/listSlice';


interface IBook {
  id?: string,
  link?: string,
  price?: number,
  title?: string,
}


const List = () => {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  const [book, setBook] = useState<IBook | null>(null)
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllBooksAsync(10))
  }, [])

  console.log(list)

  return (
    <div className="container border w-100">
      This is a Books List:
      <ul className="">
        {list && list.map((book: IBook) => (
          <li key={book.id} className=""><Link to={`${book.link}`} className="d-flex flex-column"><h3>{book.title}</h3> <span>{book.price}</span></Link></li>
        ))}
        </ul>
      
    </div>
  );
}


export default List