import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBookDetails,
  clearBookDetailsAction,
  IBookState,
} from "../../redux/bookSlice";
import { RootState } from "../../redux/store";
import ImgPlaceholder from "../../../assets/img_placeholder.png";

interface Iprops {
  id: string;
  setShowBook: (id: string) => void;
}

const BookDetails = ({ id, setShowBook }: Iprops) => {
  const bookState: IBookState = useSelector((state: RootState) => state.book);
  const { bookDetails, bookError, isLoadingList }: IBookState = bookState;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(bookDetails);
    // debugger;
  }, []);

  useEffect(() => {
    console.log({ id }, bookDetails);
    // debugger;
    if (id) {
      dispatch(getBookDetails(id));
    } else {
      dispatch(clearBookDetailsAction());
    }
  }, [id]);

  useEffect(() => {
    console.log(bookDetails);
    // ;
  }, [bookDetails]);

  const getContent = () => {
    if (isLoadingList) {
      return (
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only" />
        </div>
      );
    } else {
      if (bookError.type) {
        return (
          <div className={`alert alert-${bookError.type}`}>
            {bookError.text}
          </div>
        );
      } else if (bookDetails.title)
        return (
          <>
            <button className="rounded close" onClick={() => setShowBook("")}>
              X
            </button>
            <div className="modal_content p-5">
              <img
                className="rounded border border-light mb-5"
                // src={bookDetails.image || ImgPlaceholder}
                src={ImgPlaceholder} //(original pic doesn't work)
                alt="book cover"
              />
              <div className="d-flex justify-content-between flex-wrap header mb-3">
                <h3>{bookDetails.title}</h3>
                <span className="font-weight-bold">${bookDetails.price}</span>
              </div>
              {bookDetails.author ? (
                <p className="font-weight-bolder">
                  Author:{" "}
                  <span className="text-muted font-weight-normal">
                    {bookDetails.author}
                  </span>
                </p>
              ) : null}
              <p className="font-italic">
                {bookDetails.description ||
                  "Then he’d taken a long and pointless walk along the black induction strip, fine grit sifting from cracks in the human system. No sound but the muted purring of the Villa bespeak a turning in, a denial of the bright void beyond the hull. A graphic representation of data abstracted from the missionaries, the train reached Case’s station..."}
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`book_details_container p-4 ${id ? "show" : "d-none"}`}>
      <div className={`modal_bg`} onClick={() => setShowBook("")} />
      <div className="modal_card rounded shadow">{getContent()}</div>
    </div>
  );
};

export default BookDetails;
