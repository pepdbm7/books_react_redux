import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookAction, getAllBooksAsync } from "../../redux/listSlice";
import { IBookDetails } from "../../redux/bookSlice";
import { v4 as uuidv4 } from "uuid";

interface Iprops {
  show: boolean;
  close: () => void;
}

const CreateModal = ({ show, close }: Iprops) => {
  const dispatch = useDispatch();

  const [newBook, setNewBook] = useState<IBookDetails>({
    author: "",
    id: uuidv4(),
    image: "",
    link: "",
    price: 0,
    title: "",
    description: "",
  });

  return (
    <div className={`add_book_container p-4 ${show ? "show" : "d-none"}`}>
      <div className={`modal_bg`} onClick={() => close()} />
      <div className="modal_card rounded shadow d-flex flex-column p-5">
        <button className="rounded close" onClick={() => close()}>
          X
        </button>
        <h3 className="text-muted mb-5">Create a new book</h3>
        <div className="d-flex flex-column form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control form-control-solid mb-3"
            type="text"
            autoFocus
            onChange={(e) => {
              setNewBook({ ...newBook, title: e.target.value });
            }}
          />
          <label htmlFor="title">Price</label>
          <input
            className="form-control form-control-solid mb-3"
            type="number"
            onChange={(e) => {
              setNewBook({ ...newBook, price: Number(e.target.value) });
            }}
          />
          <label htmlFor="title">Author</label>
          <input
            className="form-control form-control-solid mb-3"
            type="text"
            onChange={(e) => {
              setNewBook({ ...newBook, author: e.target.value });
            }}
          />
          <label htmlFor="title">Description</label>
          <textarea
            className="form-control form-control-solid mb-5"
            onChange={(e) => {
              setNewBook({ ...newBook, description: e.target.value });
            }}
          />
          <button
            className="btn btn-success w-100"
            disabled={
              !newBook.title ||
              !newBook.price ||
              !newBook.author ||
              !newBook.description
            }
            onClick={() => {
              dispatch(addBookAction(newBook));
              dispatch(getAllBooksAsync());
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
