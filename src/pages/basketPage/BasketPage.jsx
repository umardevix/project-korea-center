import React, { useEffect, useState } from "react";
import styles from "./_basket.module.scss";
import Card from "../../components/card/Card";

import axios from "axios";
import { useNavigate } from "react-router-dom";


const BasketPage = () => {
  const [data, setData] = useState([1,2,]);
  const [total, setTotal] = useState(0);
  const navigate= useNavigate()

  // async function getService() {
  //   try {
  //     const res = await axios.get("/api/basket");
  //     setData(res.data);

  //     // Собираем все price в total
  //     const subTotal = res.data.reduce(
  //       (sub, item) => sub + item.price,
  //       0
  //     );
  //     setTotal(subTotal);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getService();
  // }, []);
  function handleSubmit (event) {
    event.preventDefault()
    navigate("/payment")
  }

  return (
    <section className={styles.basket}>
      <div className="container">
        <div className={styles.basket_content}>
          <div className={styles.basket_nav}>
            <h1>Главная</h1>
            <img src="/assets/svg/right.svg" alt="" />
            <h1>Корзина</h1>
          </div>
          <div className={styles.basket_block}>
            <div className={styles.basket_info}>
              <div className={styles.info_title}>
                <h1>Корзина</h1>
                <h2>
                  Итоговая сумма: <span>{total} сом</span>
                </h2>
              </div>
              {/* {data.map((el) => (
                <Card key={el.id} el={el} />
              ))} */}
            </div>
                  
            <form onSubmit={(event)=>handleSubmit(event)}>
              <h2 className={styles.title}>
                Для оформления заказа заполните необходимые поля
              </h2>
              <div className={styles.field}>
                <label className={styles.label}>Страна</label>
                <select className={styles.input}>
                  <option>Киргизстан</option>
                  {/* Другие варианты */}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <div className={styles["input-group"]}>
                  <select className={styles["select-left"]}>
                    <option>+996</option>
                    {/* Другие коды */}
                  </select>
                  <input
                    type="text"
                    className={styles["input-right"]}
                    placeholder="Введите номер"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Имя</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Введите имя"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Фамилия</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Введите фамилию"
                />
              </div>
              <div className={styles["form-footer"]}>
                <span>1 / 2</span>
                <button type="button" className={styles["next-button"]}>
                  →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasketPage;
