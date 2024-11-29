import React, { useEffect, useState } from 'react';
import styles from "./_history.module.scss";
import axios from 'axios';

function History() {
  const [isItemId, setIsItemId] = useState(null);
  const [isItemOrderId, setIsItemOrderId] = useState(null);

  async function getItem() {
    try {
      const res = await axios.get(`/payments/payments-status/${isItemId}/${isItemOrderId}/`);
      console.log(res);
      console.log(isItemId);
      console.log(isItemOrderId);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    const orderId = JSON.parse(localStorage.getItem("order_id"));

    setIsItemId(id);
    setIsItemOrderId(orderId);
  }, []); // Зависимость отсутствует, чтобы выполнить только один раз при монтировании

  useEffect(() => {
    if (isItemId && isItemOrderId) {
      getItem();
    }
  }, [isItemId, isItemOrderId]); // Зависимость от isItemId и isItemOrderId

  return (
    <div className={styles.history_container}>
      <div className={styles.history_blocks}>
        <div className={`${styles.history_block} ${styles.history_block_1}`}>
          <div className={styles.history_numbers}>
            <img src="/public/assets/svg/number.svg" alt="" />
          </div>
          <div className={styles.history_date}>
            <h4>название</h4>
          </div>
          <div className={styles.history_date}>
            <h4>Дата заказа</h4>
          </div>
          <div className={styles.history_quantity}>
            <h4>Количество</h4>
          </div>
          <div className={styles.history_quantity}>
            <h4>Статус заказа</h4>
          </div>
        </div>
        <div className={styles.history_block}>
          <div className={styles.history_numbers}>
            <p>1</p>
          </div>
          <div className={styles.history_date}>
            <p>название</p>
          </div>
          <div className={styles.history_date}>
            <p>Дата заказа</p>
          </div>
          <div className={styles.history_quantity}>
            <p>Количество</p>
          </div>
          <div className={styles.history_quantity}>
            <p>Статус заказа</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
