import React from "react";
import styles from "./_product_navigate.module.scss";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

function ProductNavigate({ product }) {
  const navigate = useNavigate()
  return (
    <div className="container">


      <div className={styles.product_navigate}>
        <div className={styles.product_navigate_1}>

          <span onClick={() => navigate('/')}>
            Главная <MdKeyboardArrowRight />
          </span>
          <span onClick={() => navigate('/')}>
            Запчасти <MdKeyboardArrowRight />
          </span>
        </div>
        <div className={styles.product_navigate_2}>

          <span>
            {product.model} <MdKeyboardArrowRight />
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
