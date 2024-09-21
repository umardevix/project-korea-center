import React from "react";
import styles from "./_product_navigate.module.scss";
import { useNavigate } from "react-router-dom";
function ProductNavigate({ product }) {
  const navigate = useNavigate()
  return (
    <div className="container">


      <div className={styles.product_navigate}>
        <div className={styles.product_navigate_1}>

          <span onClick={() => navigate('/')}>
            Главная <img src="/public/assets/svg/right.svg" alt="" />
          </span>
          <span onClick={() => navigate('/')}>
            Запчасти <img src="/public/assets/svg/right.svg" alt="" />
          </span>
        </div>
        <div className={styles.product_navigate_2}>

          <span>
            {product.model} <img src="/public/assets/svg/right.svg" alt="" />
          </span>
          <span>
            № {product.artikul}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductNavigate;
