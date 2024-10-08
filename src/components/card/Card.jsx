import React, { useState } from "react";
import styles from "./_card.module.scss";
import GreenButton from "../../ui/greenButton/GreenButton";
import BlueButton from "../../ui/blueButton/BlueButton";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteProduct, addToBasket, updateBasketCount } from "../../redux/productSlice/ProductSlice";

const Card = ({ el, isBasketPage, handleDeleteItem }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Продукт успешно удален');
      handleDeleteItem(id); // Обновление UI после удаления
      dispatch(updateBasketCount(-1)); // Уменьшаем общее количество товаров в корзине
    } catch {
      toast.error('Ошибка при удалении продукта');
    } finally {
      setLoading(false);
    }
  };

  const onAddToBasket = async () => {
    setLoading(true);
    try {
      await dispatch(addToBasket(el)).unwrap();
      toast.success('Продукт добавлен в корзину');
<<<<<<< HEAD
      dispatch(updateBasketCount(1)); // Увеличиваем общее количество товаров в корзине
    } catch {
=======

      // Increment basket count after adding the product
      setBasket(prevCount => prevCount + 1);
    } catch (error) {
>>>>>>> 027dad2d451df0f6b9a4a58af093e8aa56658beb
      toast.error('Ошибка при добавлении продукта в корзину');
    } finally {
      setLoading(false);
    }
  };


  return (
<<<<<<< HEAD
    <div className={`${styles.card} ${location.pathname === "/basket" ? styles.card_basket : ""}`}>
=======
    <div className={`${styles.card} ${location.pathname === "/basket-page" && styles.card_basket}`}>
>>>>>>> 027dad2d451df0f6b9a4a58af093e8aa56658beb
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
            <button onClick={() => handleDeleteItem(el.id)} className={styles.cart} disabled={loading}>
<<<<<<< HEAD
              {loading ? <span>Загрузка...</span> : <><img src="/assets/svg/basket_white.svg" alt="Удалить" /> Удалить</>}
=======
              {loading ? (
                <span>Загрузка...</span>
              ) : (
                <>
                  <img src="/assets/svg/basket_white.svg" alt="Добавить в корзину" />Удалить
                </>
              )}
>>>>>>> 027dad2d451df0f6b9a4a58af093e8aa56658beb
            </button>
          ) : location.pathname === '/admin' ? (
            <div className={styles.admin_btn}>
              <Button styleClass={styles.admin_update} text='Обновить' link={`/admin/edit-product/${el.id}`} />
              <Button styleClass={styles.admin_trash} text='Удалить' handleClick={() => onDeleteProduct(el.id)} />
            </div>
          ) : (
            <BlueButton el={el} handleClick={onAddToBasket} />
          )
        }
      </div>
    </div>
  );
};

export default Card;
