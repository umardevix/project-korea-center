import React from 'react'
import styles from './_footer.module.scss'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer_content}>

          <div className={styles.footer_logo}>
            <div className={styles.footer_logo_info}>
              <img src="/assets/svg/logo.svg" alt="" />
              <p>Мы доставляем аксессуары и запчасти для автомобилей в следующие страны: <span>Кыргызстан, Россия и Узбекистан.</span></p>
            </div>

            <ul className={styles.footer_order_info}>
              <h3>Способы оплаты:</h3>
              <li>
                <img src="/assets/svg/radio.svg" alt="" />
                Наличнии
              </li>
              <li>
                <img src="/assets/svg/radio.svg" alt="" />
                Мбанк
              </li>
              <li>
                <img src="/assets/svg/radio.svg" alt="" />
                Банковская карта
              </li>
            </ul>
          </div>

          <ul className={styles.footer_contact}>
            <div>
              <h3>Контакты</h3>
              <li>
                <img src="/assets/svg/map.svg" alt="" />
                Рынок "Кудайберди" 3-ряд 63 конт. ,
                4-ряд 59-60 конт. ор.: ХБК
              </li>
              <li>
                <img src="/assets/svg/call.svg" alt="" />
                +996 (555) 808 - 001
              </li>
              <li>
                <img src="/assets/svg/call.svg" alt="" />
                +996 (505) 888 - 080
              </li>
            </div>

            <div className={styles.footer_contact_social}>
              <h3>Социальные сети</h3>
              <div>
                <img src="/assets/svg/instagram.svg" alt="" />
                <img src="/assets/svg/tiktok.svg" alt="" />
              </div>
            </div>
          </ul>

          <div className={styles.footer_grafics}>
            <h3>Наши рабочие дни:</h3>
            <p>Пн - Чт, Сб - Вс: 11:00 - 18:00</p>
            <p>Пт: выходной</p>
          </div>

          <div className={styles.footer_nav}>
            <h3>Навигация</h3>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О нас</Link>
            <Link to={'/gorant'}>Гарантия</Link>
            <Link to={'/contact'}>Контакты</Link>
          </div>
        </div>
      </div>

      <div className={styles.footer_icon}>
        <img src="/assets/svg/footerIcon.svg" alt="" />
        <h2>Copyright Guli 2024. All rights reserved</h2>
      </div>

    </footer>
  )
}

export default Footer
