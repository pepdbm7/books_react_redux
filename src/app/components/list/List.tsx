import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllBooksAsync,
  selectList,
  selectListLoader,
  IListItem,
} from "../../redux/listSlice";
import { logoutAction } from "../../redux/authSlice";

//components:
import BookDetails from "../book/BookDetails";
import CreateModal from "./CreateModal";

const List = () => {
  const list = useSelector(selectList);
  const isLoadingList = useSelector(selectListLoader);
  const dispatch = useDispatch();
  const itemsPerPage = 4;
  const [page, setPage] = useState<number>(0);
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);
  const [booksOfPage, setBooksOfPage] = useState([]);
  const [showBook, setShowBook] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const settingPagination = () => {
    const totalPagesNumber = Math.ceil(list.length / itemsPerPage);
    const arrayOfPageNumbers = Array.from(
      { length: totalPagesNumber },
      (_, i) => i
    );
    setPageNumbers(arrayOfPageNumbers);
    setBooksOfPage(list.slice(page * itemsPerPage, itemsPerPage));
  };

  useEffect(() => {
    if (!list.length) {
      //after F5 we take it from persist storage, no need to call api again
      dispatch(getAllBooksAsync());
    } else {
      settingPagination();
    }
  }, []);

  useEffect(() => {
    if (list.length) {
      settingPagination();
    }
  }, [list]);

  useEffect(() => {
    const offset = page * itemsPerPage;
    const count = offset + itemsPerPage;
    const booksCurrentPage = list.slice(offset, count);

    setBooksOfPage(booksCurrentPage);
  }, [page]);

  return (
    <>
      <div className="list_page w-100">
        <div className="jumbotron shadow d-flex justify-content-between flex-wrap mb-5">
          <h2 className="text-primary">This is a Books List</h2>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => dispatch(logoutAction())}
          >
            Logout
          </button>
          <div className="d-flex"></div>
          Add new book:
          <button className="ml-2" onClick={() => setShowCreateModal(true)}>
            +
          </button>
        </div>
        {isLoadingList ? (
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only" />
          </div>
        ) : (
          <>
            <div className="table_container p-5 mt-5">
              <table className="table table-striped table-bordered">
                <thead className="thead-primary">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {booksOfPage &&
                    booksOfPage.map((book: IListItem) => (
                      <tr
                        key={book.id}
                        className="table_row"
                        onClick={() => setShowBook(book.id)}
                      >
                        <th scope="row">{book.title}</th>
                        <td>{book.price} €</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {pageNumbers ? (
              <nav className="my-4 ml-5">
                <ul className="pagination">
                  <li
                    className={`page-item ${!page ? "disabled" : ""}`}
                    onClick={() => page && setPage(page - 1)}
                  >
                    <span className="page-link">Previous</span>
                  </li>
                  {pageNumbers.map((number: number) => (
                    <li
                      className={`page-item ${page === number ? "active" : ""}`}
                      onClick={() => setPage(number)}
                    >
                      <span className="page-link">{number + 1}</span>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      page + 1 === pageNumbers.length ? "disabled" : ""
                    }`}
                    onClick={() =>
                      page + 1 < pageNumbers.length && setPage(page + 1)
                    }
                  >
                    <span className="page-link">Next</span>
                  </li>
                </ul>
              </nav>
            ) : null}
          </>
        )}
      </div>
      <BookDetails id={showBook} setShowBook={() => setShowBook("")} />
      {showCreateModal ? (
        <CreateModal
          show={showCreateModal}
          close={() => setShowCreateModal(false)}
        />
      ) : null}
    </>
  );
};

export default List;
