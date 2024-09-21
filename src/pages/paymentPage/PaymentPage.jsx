import React, { useState } from 'react'
import styles from "./_payment.module.scss"
import { useNavigate } from 'react-router-dom'
import MBank from '../../components/mBank/MBank'
import Cart from '../../components/cart/Cart'
function PaymentPage() {
    const navigate = useNavigate()
    const [isnavigate, setIsNavigate] = useState(false)
  return (
    <section className={styles.payment_section}>
        <div className="container">

        <div className={styles.payment_container}>
           <div className={styles.payment_header}>
            <span>Главная <img src="/assets/svg/right.svg" alt="" /></span>
            <span>Корзина <img src="/assets/svg/right.svg" alt="" /></span>
            <span>Оформить заказ</span>
            </div> 
          <form action="">
            <label htmlFor="">Способ оплаты</label>
            <div className={styles.payment_info}>
                <div className={styles.payment_info_top}>
                    <div className={styles.payment_block}><img onClick={()=>setIsNavigate(!isnavigate)} src={isnavigate?"/assets/svg/cartImage.svg":"/assets/svg/green.svg"} alt="" />Мбанк</div>
                    <div className={styles.payment_block}><img onClick={()=>setIsNavigate(!isnavigate)} src={isnavigate?"/assets/svg/green.svg":"/assets/svg/cartImage.svg"} alt="" />Банковская карта</div>
        
                </div>
                {
                  isnavigate?<>
         <Cart/></>:<> <MBank/></>
                }
        
              <div className={styles.login_button}>
              <button onClick={()=>navigate("/opt")}>Получить код</button>
            </div>
            </div>
          </form>
        </div>
        </div>
      
    </section>
  )
}

export default PaymentPage
