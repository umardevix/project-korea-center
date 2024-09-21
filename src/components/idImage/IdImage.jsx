import React from 'react'
import styles from "./_id_image.module.scss"

function IdImage() {
  return (
    <div className={styles.id_image_global}>

      <div className={styles.id_image_img}>
        <img src="/assets/images/image1.png" alt="" />
        
      </div>
      <div className={styles.id_image_blocks}>
        <img src="/assets/images/image4.png" alt="" />
        <img src="/assets/images/image4.png" alt="" />
        <img src="/assets/images/image4.png" alt="" />
        <img src="/assets/images/image4.png" alt="" />
        
      </div>

    </div>
  )
}

export default IdImage
