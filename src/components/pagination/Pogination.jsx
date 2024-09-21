import React from "react";
import styles from './_pogination.module.scss';

const Pogination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination_block}>
        <li className={styles.pagination_block_li}>
          <button 
            className={styles.pagination_block_li_btn} 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1} // Disable if on the first page
          >
            Предыдущий
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li 
            className={`${styles.pagination_block_number} ${currentPage === number ? styles.active : ''}`} 
            key={number}
          >
            <button 
              className={styles.pagination_block_number_btns} 
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`${styles.pagination_block_li} ${currentPage === totalPages ? styles.disabled : ''}`}>
          <button 
            className={styles.pagination_block_li_btn} 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages} // Disable if on the last page
          >
            Следующий
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pogination;
