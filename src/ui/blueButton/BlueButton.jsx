import React from "react";
import styles from "./_blue_button.module.scss";
import axios from "axios";

function BlueButton({ el }) {
  async function postService() {
    try {
      const { data } = await axios.get("/api/basket");
      const isData = data.find((x) => x.id === el.id);
      if (!isData) {
        const res = await axios.post("/api/basket", el);
        alert("Ваш продукт успешно добавлен в корзину");
      } else {
        alert("Ваш продукт уже в корзине");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={() => postService()} className={styles.cart}>
      <img src="/assets/svg/basket_white.svg" alt="" /> В корзину
    </button>
  );
}

export default BlueButton;
