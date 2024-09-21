import React from 'react'
import styles from "./_poup.module.scss"
import { useNavigate } from 'react-router-dom'
function Popup({text,to}) {
    const navigate = useNavigate()
  return (
    <div className={styles.popup_fixed}>
        <div className="container">
         <div className={styles.popup_container}>
            <div className={styles.popup_info}>
                <div className={styles.popup_content}>
                    <div className={styles.popup_top}>
                        <img src="/assets/svg/green_checkbox.svg" alt="" />
                        <p>Вы оформили заказ успешно!</p>
                    </div>
                    <div className={styles.popup_button}>
                        <button onClick={()=>navigate(`/${to}`)}>{text}</button>
                    </div>
                </div>

            </div>
         </div>
        </div>
      
    </div>
  )
}

export default Popup
