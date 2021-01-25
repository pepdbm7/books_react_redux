import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBookDetails,
  setDetailsLoaderAction,
  clearBookDetailsAction,
  IBookState,
  IBookDetails,
  initialBookDetails,
} from "../../redux/bookSlice";
import { selectList } from "../../redux/listSlice";
import { RootState } from "../../redux/store";
import ImgPlaceholder from "../../../assets/img_placeholder.png";
import { FadeIn } from "ts-react-fade";

interface Iprops {
  id: string;
  setShowBook: (id: string) => void;
}

const BookDetails = ({ id, setShowBook }: Iprops) => {
  const list = useSelector(selectList);
  const bookState: IBookState = useSelector((state: RootState) => state.book);
  const { bookDetails, bookError, isLoadingList }: IBookState = bookState;

  const [detailsToShow, setDetailsToShow] = useState<IBookDetails>(
    initialBookDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (bookDetails.title) dispatch(clearBookDetailsAction());
    };
  }, []);

  useEffect(() => {
    if (bookDetails) setDetailsToShow(bookDetails);
  }, [bookDetails]);

  useEffect(() => {
    if (id) {
      console.log(id);
      const regExp = /[a-zA-Z]/g;
      const hasLetters = regExp.test(id);

      if (hasLetters) {
        dispatch(setDetailsLoaderAction(true));

        const addedBookDetails = list.find(
          (book: IBookDetails) => book.id === id
        );
        setTimeout(() => {
          setDetailsToShow(addedBookDetails);
          dispatch(setDetailsLoaderAction(false));
        }, 800);
      } else {
        dispatch(getBookDetails(id));
      }
    }
  }, [id]);

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
          <div className={`alert alert-${bookError.type} m-5`}>
            {bookError.text}
          </div>
        );
      } else if (detailsToShow.title)
        return (
          <>
            <button className="rounded close" onClick={() => setShowBook("")}>
              X
            </button>
            <div className="modal_content p-5">
              <img
                className="rounded border border-light mb-5"
                // src={detailsToShow.image || ImgPlaceholder}
                src={ImgPlaceholder} //(original pic doesn't work)
                alt="book cover"
              />
              <div className="d-flex justify-content-between flex-wrap header mb-3">
                <h3>{detailsToShow.title}</h3>
                <span className="font-weight-bold">${detailsToShow.price}</span>
              </div>
              {detailsToShow.author ? (
                <p className="font-weight-bolder">
                  Author:{" "}
                  <span className="text-muted font-weight-normal">
                    {detailsToShow.author}
                  </span>
                </p>
              ) : null}
              <p className="font-italic">
                {detailsToShow.description ||
                  "Then he’d taken a long and pointless walk along the black induction strip, fine grit sifting from cracks in the human system. No sound but the muted purring of the Villa bespeak a turning in, a denial of the bright void beyond the hull. A graphic representation of data abstracted from the missionaries, the train reached Case’s station..."}
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <FadeIn>
      <div className={`book_details_container p-4 `}>
        <div className={`modal_bg`} onClick={() => setShowBook("")} />
        <div className="modal_card rounded shadow">{getContent()}</div>
      </div>
    </FadeIn>
  );
};

export default BookDetails;
