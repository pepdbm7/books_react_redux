import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/store";
import { getAllBooksAsync, selectList } from "../../redux/listSlice";
import { logout } from "../../redux/authSlice";
import BookDetails from "../book/BookDetails";

interface IBook {
  id: string;
  link: string;
  price: number;
  title: string;
}

const List = () => {
  const list = useSelector(selectList);
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [showBook, setShowBook] = useState<string>("");

  useEffect(() => {
    if (!list.length) {
      // debugger
      dispatch(getAllBooksAsync(10));
    }
  }, []);

  return (
    <div className="container border w-100 p-5">
      <div className="row justify-content-between mb-5">
        <h2 className="text-primary">This is a Books List</h2>
        <button
          className="btn btn-sm btn-light"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead className="thead-primary">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((book: IBook) => (
                <tr onClick={() => setShowBook(book.id)}>
                  <th scope="row">{book.title}</th>
                  <td>{book.price} €</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <BookDetails id={showBook} setShowBook={setShowBook} />
    </div>
  );
};

export default List;
