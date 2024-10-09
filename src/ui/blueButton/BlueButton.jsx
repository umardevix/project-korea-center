import React, { useState } from "react";
import styles from "./_blue_button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/productSlice/ProductSlice";
import { toast } from "react-toastify";

const BlueButton = React.memo(({ el }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.user.user?.accessToken) || localStorage.getItem('accessToken');

  const handleAddToBasket = async () => {
    if (!el.id) {
      toast.error("Ошибка: Продукт не найден.");
      return;
    }

    const productData = {
      product: el.id,
      quantity: 1,
    };

    if (!accessToken) {
      toast.error("Ошибка: Вы не авторизованы. Пожалуйста, войдите в систему.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(addToBasket({ productData, accessToken })).unwrap();
      toast.success("Продукт успешно добавлен в корзину");
      dispatch(updateBasketCount(1)); // Обновляем общее количество товаров в корзине
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToBasket} className={styles.cart} disabled={loading}>
      {loading ? (
        <span>Загрузка...</span>
      ) : (
        <>
          <img src="/assets/svg/basket_white.svg" alt="Добавить в корзину" /> В корзину
        </>
      )}
    </button>
  );
});

export default BlueButton;
