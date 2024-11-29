// import React from 'react';
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { RiTiktokFill } from "react-icons/ri";
import { PiYoutubeLogo } from "react-icons/pi";
import styles from "./_contact.module.scss";
import { Link } from "react-router-dom";

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
                  <CiLocationOn />

                  <p>
                    Рынок "Кудайберди" 3-ряд 63 конт. , 4-ряд 59-60 конт. ор.:
                    ХБК
                  </p>
                </div>

                <div className={styles.contact_section_end}>
                  <CiPhone />
                  <p>+996 (555) 808 - 001</p>
                </div>

                <div className={styles.contact_section_end}>
                  <CiPhone />
                  <p>+996 (505) 888 - 080</p>
                </div>
                <div className={styles.contact_section_inet}>
                  <h2>Социальные сети</h2>
                  <div className={styles.contact_section_img}>
                    <Link to="https://www.instagram.com/koreacenter.kg?igsh=MXduNG4xd3ZpZHBycQ==">
                      <FaInstagram style={{ fontSize: "42px" }} />
                    </Link>
                    <Link to="https://www.tiktok.com/@koreacenter.kg?_t=8rCD7h4IGPf&_r=1">
                      <RiTiktokFill style={{ fontSize: "42px" }} />
                    </Link>
                    <Link to="https://youtube.com/@koreacenterkg?si=UQI0I39zDETkWnVU">
                      <PiYoutubeLogo style={{ fontSize: "42px" }} />
                    </Link>
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
                  style={{ border: 8 }}
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
  );
};

export default Contact;
