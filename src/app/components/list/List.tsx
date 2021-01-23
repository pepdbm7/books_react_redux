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
      dispatch(getAllBooksAsync(0, 5));
    }
  }, []);

  useEffect(() => {
    page === 0
      ? dispatch(getAllBooksAsync(0, 5))
      : dispatch(getAllBooksAsync(5, 5));
  }, [page]);

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
        <nav className="my-4">
          <ul className="pagination">
            <li
              className="page-item"
              onClick={() => page === 1 && setPage(page - 1)}
            >
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li
              className={`page-item ${page === 0 ? "active" : ""}`}
              onClick={() => page === 1 && setPage(0)}
            >
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li
              className={`page-item ${page === 1 ? "active" : ""}`}
              onClick={() => page === 0 && setPage(1)}
            >
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li
              className="page-item"
              onClick={() => page === 0 && setPage(page + 1)}
            >
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <BookDetails id={showBook} close={() => setShowBook("")} />
    </div>
  );
};

export default List;
