import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_basket.module.scss";
import Card from "../../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addItemToBasket, removeItemFromBasket } from "../../redux/basketSlice/basketSlice";

const BasketPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.basket.items) || [];
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const getBasket = async () => {
    setLoading(true); // Start loading
    try {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        return;
      }
  
      const res = await axios.get("http://130.211.125.242/basket/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (res.data && Array.isArray(res.data.basket.items)) {
        dispatch({ type: 'basket/clearBasket' });

        const uniqueItems = Array.from(new Set(res.data.basket.items.map(item => item.product.id)))
          .map(id => res.data.basket.items.find(item => item.product.id === id));

        uniqueItems.forEach((item) => {
          dispatch(addItemToBasket(item));
        });

        setTotal(res.data.basket.total_price); // Assuming this is correct
      } else {
        console.error('Ожидался массив items, но получен:', res.data);
      }
    } catch (error) {
      console.error('Ошибка при получении корзины:', error);
      alert('Не удалось загрузить корзину. Попробуйте еще раз.');
  
      if (error.response && error.response.status === 401) {
        alert('Ваш токен доступа истек. Пожалуйста, войдите в систему снова.');
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      dispatch(removeItemFromBasket(productId));
      await axios.delete(`http://130.211.125.242/basket/item/${productId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      getBasket(); 
    } catch (error) {
      console.error('Ошибка при удалении элемента из корзины:', error);
      alert('Не удалось удалить элемент из корзины. Попробуйте еще раз.');
      getBasket(); 
    }
  };

  useEffect(() => {
    if (user) {
      getBasket(); 
    }
  }, [dispatch, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/payment");
  };

  if (loading) {
    return <div>Загрузка...</div>; // Add loading state
  }

  return (
    <section className={styles.basket}>
      {user ? (
        <div className="container">
          <div className={styles.basket_content}>
            <div className={styles.basket_nav}>
              <h1>Главная</h1>
              <img src="/assets/svg/right.svg" alt="" />
              <h1>Корзина</h1>
            </div>
            <div className={styles.basket_block}>
              <div className={styles.basket_info}>
                <div className={styles.info_title}>
                  <h1>Корзина</h1>
                  <h2>
                    Итоговая сумма: <span>{total} сом</span>
                  </h2>
                </div>
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.product.id} className={styles.card}>
                      <Card 
                        el={item.product} 
                        isBasketPage={true} 
                        handleDeleteItem={handleDeleteItem} 
                      />
                    </div>
                  ))
                ) : (
                  <p>Корзина пуста</p>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <h2 className={styles.title}>
                  Для оформления заказа заполните необходимые поля
                </h2>
                <div className={styles.field}>
                  <label className={styles.label}>Страна</label>
                  <select className={styles.input}>
                    <option>Кыргызстан</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Телефон</label>
                  <div className={styles["input-group"]}>
                    <select className={styles["select-left"]}>
                      <option>+996</option>
                    </select>
                    <input
                      type="text"
                      className={styles["input-right"]}
                      placeholder="Введите номер"
                      required
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Имя</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Введите имя"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Фамилия</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Введите фамилию"
                    required
                  />
                </div>
                <div className={styles["form-footer"]}>
                  <span>1 / 2</span>
                  <button type="submit" className={styles["next-button"]}>
                    →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h2>Пожалуйста, войдите в систему, чтобы увидеть свою корзину.</h2>
      )}
    </section>
  );
};

export default BasketPage;
