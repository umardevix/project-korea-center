import React from 'react'
import styles from "./_datale.module.scss"
function DatalePage() {
    
  return (
    <div >
      <div className="container">
       <div className={styles.datale_top}>
        <div className={styles.datale_left}>
            <img src="/public/assets/svg/arrowleft.svg" alt="" />
            <p>Назад</p>
        </div>
        <h1>Детали заказа</h1>


       </div>
       <div className={styles.datale_info}>
        <div className={styles.datale_block_left}>
  
            <div className={styles.datale_block_item}>
                <p>Дата заказа:</p>
                <p>23-02-2022</p>
            </div>
            <div className={styles.datale_block_item}>
                <p>Статус заказа:</p>
                <p>Отправен</p>
            </div>
         
        </div>
        <div className={styles.datale_block_right}>
            <h5>Товар</h5>
            <ul >
                <li><span>Антенна усилитель AM/FM (2шт) 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    4500 сом</span>
                </li>
                <li><span>Антенна усилитель AM/FM (2шт) 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    4500 сом</span>
                </li>
                <li><span>Антенна усилитель AM/FM (2шт) 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    4500 сом</span>
                </li>
                <li><span>Антенна усилитель AM/FM (2шт) 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    4500 сом</span>
                </li>
                
            </ul>
            <div className={styles.datale_total}>Общая стоимость 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    4500 сом</div>

        </div>
       </div>

      </div>
      
    </div>
  )
}

export default DatalePage
