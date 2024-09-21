import React from 'react'
import styles from "./_mBank.module.scss"
function MBank() {
  return (
        <div className={ `${styles.login_input_1} ${styles.login_input_one}`}>
                <span>Номер Мбанк</span>
                <div className={styles.login_input}>
                  <input type="text" />
                  <div className={styles.select_dropdown}>
                    <p>+996</p>
                    <div className={styles.select_dropdown_img}>
                        <img src="/public/assets/svg/arrow_bottom.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div> 
  )
}

export default MBank
