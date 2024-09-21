import React from "react";
import styles from "./_green_button.module.scss";

function GreenButton({price}) {
  return (
    <div className={styles.price}>
      <button>В наличии</button>
      <p>{price} сом</p>
      <span>~ 4,5 $ ~ 405 ₽</span>
    </div>
  );
}

export default GreenButton;
