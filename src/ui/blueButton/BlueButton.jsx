import React, { useEffect, useState } from "react";
import styles from "./_blue_button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/productSlice/ProductSlice";
import { toast } from "react-toastify";
import axios from "axios";


const BlueButton = React.memo(({ el }) => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.user.user?.accessToken) || localStorage.getItem('accessToken');
  const [data , setData] = useState([])
  async function getSerivce () {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/",{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      setData(res.data.items)
      
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(()=>{
    getSerivce()
  },[])

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
    const isAlreadyInBasket = data.some(
      (item) => item.product.id === el.id
    );
    if (isAlreadyInBasket) {
      toast.info("Ваш продукт уже в корзине.");
      return;
    }
    try {
      setLoading(true);
      await dispatch(addToBasket({ productData, accessToken })).unwrap();
      // alert("ok")
      getSerivce()
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
