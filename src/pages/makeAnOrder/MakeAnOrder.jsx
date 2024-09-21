import React, { useState } from 'react'
import styles from "./_make.module.scss"
import NewPopup from '../../components/newPopup/NewPopup'

function MakeAnOrder() {
  const [popup , setPopup] = useState(false)
  return (
    <section className={styles.make_section}>
      <div className="container">
        <div className={styles.make_continer}>
            <div className={styles.make_header}>
                <span>Главная <img src="/assets/svg/right.svg" alt="" /> </span>
                <span>Уведомление </span>
            </div>
            <div className={styles.make_texts}>
                <h1>Подтвердите получение товара</h1>
                <p>Ваш заказ был доставлен. Пожалуйста, подтвердите получение товара, нажав на кнопку ниже</p>

                 <div className={styles.make_div}>

                <button onClick={() =>setPopup(true)}>Подтвердить получение</button> 
                 </div>
            </div>

        </div>
      </div>
      {
        popup&&
        <NewPopup/>
      }
    </section>
  )
}

export default MakeAnOrder
