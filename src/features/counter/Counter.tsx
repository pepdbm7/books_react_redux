import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllBooksAsync,
  selectList,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllBooksAsync(10))
  }, [])

  return (
    <div className="container">
      <ul className={styles.value}>{list && list.map(({title, price}, i) => (
<li key={i} className=""><Link className="d-flex flex-column"><h3>{title}</h3> <span>{price}</span></div></li>
        ))}</ul>
      {/*<div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
       <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          etList
        </button> 
      </div>*/}
    </div>
  );
}
