import React, { useState } from 'react'
import styles from "./_id_image.module.scss"

function IdImage({ image1, image2, image3, image4 }) {
  const [imageIndex, setImageIndex] = useState(0)
  const imageUrl = [image1, image2, image3, image4]
  return (
    <div className={styles.id_image_global}>

      <div className={styles.id_image_img}>
        <img
          className='image-slider'
          src={imageUrl[imageIndex]}
          alt=''
        />

      </div>
      <div className={styles.id_image_blocks}>
        {imageUrl.map((url, idx) => (

          < img
            key={idx}
            onClick={() => setImageIndex(idx)}
            src={url}
            alt=''
          />
        ))}

      </div>

    </div >
  )
}

export default IdImage
