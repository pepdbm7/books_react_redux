import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookAction } from "../../redux/listSlice";
import { IBookDetails } from "../../redux/bookSlice";

interface Iprops {
  show: boolean;
  close: () => void;
}

const CreateModal = ({ show, close }: Iprops) => {
  const [newBook, setNewBook] = useState<IBookDetails>({
    author: "",
    id: "",
    image: "",
    link: "",
    price: 0,
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  return (
    <div className={`book_details_container p-4 ${show ? "show" : "d-none"}`}>
      <div className={`modal_bg`} onClick={() => close()} />
      <div className="modal_card rounded shadow">
        <h3 className="text-muted mb-4">Create a new book</h3>
        <div className="d-flex flex-column form-group">
          <label htmlFor="title">Title</label>
          <input
            className="w-100 mb-3"
            type="text"
            required
            onBlur={(e) => {
              if (e.target.value)
                setNewBook({ ...newBook, title: e.target.value });
            }}
          />
          <label htmlFor="title">Price</label>
          <input
            className="w-100 mb-3"
            type="number"
            required
            onBlur={(e) => {
              if (e.target.value)
                setNewBook({ ...newBook, price: Number(e.target.value) });
            }}
          />
          <label htmlFor="title">Author</label>
          <input
            className="w-100 mb-3"
            type="text"
            required
            onBlur={(e) => {
              if (e.target.value)
                setNewBook({ ...newBook, author: e.target.value });
            }}
          />
          <label htmlFor="title">Description</label>
          <input
            className="w-100 mb-3"
            type="text"
            required
            onBlur={(e) => {
              if (e.target.value)
                setNewBook({ ...newBook, description: e.target.value });
            }}
          />
          <button
            className="btn btn-success mx-auto"
            disabled={
              !newBook.title ||
              !newBook.price ||
              !newBook.author ||
              !newBook.description
            }
            onClick={() => dispatch(addBookAction(newBook))}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
