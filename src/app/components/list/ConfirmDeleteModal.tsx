import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookAction, getAllBooksAsync } from "../../redux/listSlice";
import { IBookDetails } from "../../redux/bookSlice";
import { v4 as uuidv4 } from "uuid";

interface Iprops {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal = ({ show, onConfirm, onCancel }: Iprops) => {

  return (
    <div className={`add_book_container p-4 ${show ? "show" : "d-none"}`}>
      <div className={`modal_bg`} onClick={() => onCancel()} />
      <div className="modal_card rounded shadow d-flex flex-column p-5">
        <button className="rounded close" onClick={() => onCancel()}>
          X
        </button>
        <div className="d-flex flex-column">
        <h3 className="text-muted mb-5"> Atention!</h3>
         <h4 className="text-muted mb-5">You are going to remove this book. Are you sure?</h4>
        <div className="d-flex justify-content-between">
           <button
            className="btn btn-danger btn-lg mr-2"
            onClick={() => {
              onConfirm()
            }}
          >
            Remove
          </button> <button
            className="btn btn-secondary btn-lg"
            autoFocus
            onClick={() => {
              onCancel()
            }}
          >
            Cancel
          </button>
        </div>
         
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
