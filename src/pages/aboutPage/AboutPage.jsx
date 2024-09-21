// import React from 'react'
import { HiOutlineArrowSmRight } from "react-icons/hi";

import styles from './_about.module.scss'


function AboutPage() {
  return (
    <div>
      <section className={styles.about_section}>
        <div className="container">
          <div className={styles.about_section_home}>
            <p>Главная</p>
            <HiOutlineArrowSmRight />
            <p>Уведомление </p>
          </div>

          <div className={styles.about_about_block}>
            <h1>О нас</h1>
            <div className={styles.about_wrapper}>

              <p className={styles.about_wrapper_p}>Мы рады представить вам наш магазин, основанный в 2019 году. Мы специализируемся на продаже б/у и новых запчастей для автомобилей, включая кузовные детали, ходовую часть и двигатели АКПП, импортируемые из Кореи. В нашем ассортименте представлены оригинальные запчасти и аналоги от ведущих корейских производителей, а также б/у запчасти высокого качества.</p>

              <p className={styles.about_wrapper_p_two}>Мы предлагаем выгодные условия сотрудничества для оптовых клиентов и предоставляем скидки постоянным покупателям. Наша компания сотрудничает напрямую с заводами-изготовителями, что гарантирует качество и надёжность поставляемых товаров. </p>

              <p>Мы предоставляем различные способы оплаты, такие как Mbank, ЭЛКАРТ и переводы Visa и Mastercard. Наш интернет-магазин доступен по адресу <a className={styles.about_link} href="https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0_%D0%9A%D0%BE%D1%80%D0%B5%D1%8F">[www.koreacenter.kg](http://www.koreacenter.kg)</a> , и мы активно присутствуем в социальных сетях Instagram, YouTube и TikTok. Обращайтесь к нам, и мы поможем вам найти всё необходимое для вашего автомобиля!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
