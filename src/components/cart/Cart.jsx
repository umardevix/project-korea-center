import React from "react";
import styles from "./_cart.module.scss";
function Cart() {
  return (
    <div>
      <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
        <span>Номер карты</span>
        <div className={styles.login_input}>
          <input
            // onChange={handleChange}
            name="surname"
            value=""
            type="text"
          />
        </div>
      </div>
      <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
        <span>ФИО </span>
        <div className={styles.login_input}>
          <input
            // onChange={handleChange}
            name="surname"
            value=""
            type="text"
          />
        </div>
      </div>
      <div className={styles.cart_blocks}>
      <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
        <span>Дата</span>
        <div className={styles.login_input}>
          <input
            // onChange={handleChange}
            name="surname"
            value=""
            type="text"
          />
        </div>
      </div>
      <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
        <span>CVV</span>
        <div className={styles.login_input}>
          <input
            // onChange={handleChange}
            name="surname"
            value=""
            type="text"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Cart;
