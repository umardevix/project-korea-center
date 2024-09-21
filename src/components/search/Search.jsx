import React, { useEffect, useState } from 'react'
import styles from "./_search.module.scss"
import { useLocation } from 'react-router-dom';
import { SearchPopup } from '../../ui/searchPopup/SearchPopup';
function Search() {
  const location = useLocation()

  return (
    <div>
      <div className={`${styles.first_search} ${location.pathname === "/" ? styles.first_search_true : styles.first_search_false}`}>
        <div className={styles.first_filter_container}>
          <div className={styles.first_filter}>
            <SearchPopup />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Search
