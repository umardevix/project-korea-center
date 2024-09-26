// import React from 'react';
import { HiOutlineArrowSmRight } from "react-icons/hi";

import styles from './_contact.module.scss';

const Contact = () => {
    return (
        <div>
            <section className={styles.contact_section}>
                <div className="container">
                    <div className={styles.contact_section_home}>
                        <p>Главная</p>
                        <HiOutlineArrowSmRight />
                        <p>Уведомление </p>
                    </div>

                    <div className={styles.contact_section_left}>
                        <h1>Контакты</h1>

                        <div className={styles.contact_section_block}>
                            <div className={styles.contact_section_number}>
                                <h2>Контакты</h2>
                                <div className={styles.contact_section_gps}>
                                    <img src="/public/assets/images/Vector.png" alt="" />
                                    <p>Рынок "Кудайберди" 3-ряд 63 конт. ,
                                        4-ряд 59-60 конт. ор.: ХБК</p>
                                </div>

                                <div className={styles.contact_section_end}>
                                    <img src="/public/assets/images/Phone.png" alt="" />
                                    <p>+996 (555) 808 - 001</p>
                                </div>

                                <div className={styles.contact_section_end}>
                                    <img src="/public/assets/images/Phone.png" alt="" />
                                    <p>+996 (505) 888 - 080</p>
                                </div>
                                <div className={styles.contact_section_inet}>
                                    <h2>Социальные сети</h2>
                                    <div className={styles.contact_section_img}>
                                        <img src="/public/assets/images/insta-con.png" alt="" />
                                        <img src="/public/assets/images/tik-con.png" alt="" />
                                    </div>
                                </div>
                                <div className={styles.contact_section_day}>
                                    <h2>Наши рабочие дни:</h2>
                                    <p>Пн - Чт, Сб - Вс: 11:00 - 18:00</p>
                                    <p>Пт: выходной</p>
                                </div>
                            </div>


                            <div className={styles.contact_section_right}>
                                <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1515.3666447669766!2d72.8022568!3d40.5695667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bdab6fdd595d33%3A0xaeb51883fc5cba37!2z0JrQvtGA0LXRjyDQptC10L3RgtGA!5e0!3m2!1sru!2skg!4v1727256695043!5m2!1sru!2skg" 
                                width="100%" 
                                height="100%" 
                                style={{border: 8}}
                                allowFullScreen
                                 loading="lazy"
                                 referrerPolicy="no-referrer-when-downgrade"
                                  />

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;
