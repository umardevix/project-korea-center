import React, { useEffect } from "react";
import styles from "./_card.module.scss";
import GreenButton from "../../ui/greenButton/GreenButton";
import BlueButton from "../../ui/blueButton/BlueButton";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonTrash } from "../../ui/buttonTrash/ButtonTrash";
import Button from "../../ui/button/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/productSlice/ProductSlice";

const Card = ({ el }) => {
  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onDeleteProduct = async (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast.success('Product deleted successfully');
      })
      .catch((error) => {
        toast.error('Failed to delete product');
      });
  };

  return (

    <div className={`${styles.card} ${location.pathname === "/basket" && styles.card_basket}`}>
      <div onClick={() => navigate(`/product/${el.id}`)} className={styles.card_img_content}>
        <div className={styles.card_img}>
          <img
            src={el.image1}
            alt=""
          />
        </div>
        <div className={styles.card_info_list}>
          <div className={styles.title}>
            <h3>{el.title}</h3>
            <p>{el.marka} Model {el.model} {el.year}</p>
          </div>
          <div className={styles.catalog}>
            <p>
              Состояние товара: <span>{el.choice}</span>
            </p>
            <p>
              Номер запчасти: <span>{el.spare_part_number
              }</span>
            </p>
            <p className={styles.catalog_desc}>
              {el.description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.card_btn}>
        <GreenButton price={el.price} />
        {
          location.pathname === '/basket' ? (
            <ButtonTrash el={el} />
          ) : location.pathname === '/admin' ? (
            <div className={styles.admin_btn}>
              <Button styleClass={styles.admin_update} text='Update' link={`/admin/edit-product/${el.id}`} />
              <Button styleClass={styles.admin_trash} text='trash' handleClick={() => onDeleteProduct(el.id)
              } />
            </div>

          ) : (
            <BlueButton el={el} />
          )
        }

      </div>
    </div>


  );
};

export default Card;
