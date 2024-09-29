import React from "react";
import styles from "./_card.module.scss";
import GreenButton from "../../ui/greenButton/GreenButton";
import BlueButton from "../../ui/blueButton/BlueButton";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonTrash } from "../../ui/buttonTrash/ButtonTrash";
import Button from "../../ui/button/Button";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteProduct, addToBasket } from "../../redux/productSlice/ProductSlice";
import { useState } from "react";


const Card = ({ el, isBasketPage, handleDeleteItem, setBasket }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onDeleteProduct = async (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast.success('Продукт успешно удален');
      })
      .catch(() => {
        toast.error('Ошибка при удалении продукта');
      });
  };

  const onAddToBasket = async () => {
    try {
      await dispatch(addToBasket(el)).unwrap();
      toast.success('Продукт добавлен в корзину');
      
      // Increment basket count after adding the product
      setBasket(prevCount => prevCount + 1);
    } catch (error) {
      toast.error('Ошибка при добавлении продукта в корзину');
    }
  };

  return (
    <div className={`${styles.card} ${location.pathname === "/basket" && styles.card_basket}`}>
      <div onClick={() => navigate(`/product/${el.id}`)} className={styles.card_img_content}>
        <div className={styles.card_img}>
          <img src={el.image1} alt={el.title} />
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
              Номер запчасти: <span>{el.spare_part_number}</span>
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
          isBasketPage ? (
            <button onClick={() => handleDeleteItem(el.id)}  className={styles.cart} disabled={loading}>
            {loading ? (
              <span>Загрузка...</span>
            ) : (
              <>
                <img src="/assets/svg/basket_white.svg" alt="Добавить в корзину" />Удалить
              </>
            )}
          </button>
          ) : location.pathname === '/admin' ? (
            <div className={styles.admin_btn}>
              <Button styleClass={styles.admin_update} text='Обновить' link={`/admin/edit-product/${el.id}`} />
              <Button styleClass={styles.admin_trash} text='Удалить' handleClick={() => onDeleteProduct(el.id)} />
            </div>
          ) : (
            <BlueButton el={el} handleClick={onAddToBasket} setBasket={setBasket} /> // Ensure setBasket is passed correctly
          )
        }   
      </div>
    </div>
  );
};

export default Card;
