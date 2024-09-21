import React, { useEffect, useState } from 'react'
import ProductNavigate from '../productNavigate/ProductNavigate'
import styles from "./_id_first_section.module.scss"
import IdImage from '../idImage/IdImage'
import Search from '../search/Search'
import Detales from '../detales/Detales'

function IdFirstSection({ product }) {

  return (
    <div>
      <ProductNavigate product={product} />
      <div className="container">
        <div className={styles.id_first_container}>
          <div className={styles.id_first_image_content}>
            <IdImage product={product} />
          </div>
          <div className={styles.id_div}>
            <div className={styles.id_first_info_content}>
              <Detales product={product} />
            </div>
            <div className={styles.id_first_search_content}>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdFirstSection
