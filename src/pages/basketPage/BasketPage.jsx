import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_basket.module.scss";
import Card from "../../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addItemToBasket, removeItemFromBasket } from "../../redux/basketSlice/basketSlice";
import { toast } from "react-toastify";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const BasketPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.basket.items) || [];
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");



  useEffect(() => {
    if (!user) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/login');
    } else {
      // Если пользователь есть, загружаем корзину
      getBasket();
    }
  }, [user, navigate]);

  const getBasket = async () => {
    setLoading(true); // Начинаем загрузку
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        navigate('/login');
        return;
      }

      // Запрос к новому API
      const res = await axios.get("https://koreacenter.kg/api/basket/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Проверяем структуру ответа
      if (res.data && Array.isArray(res.data.items)) {
        dispatch({ type: 'basket/clearBasket' });

        const uniqueItems = Array.from(new Set(res.data.items.map(item => item.product.id)))
          .map(id => res.data.items.find(item => item.product.id === id));

        uniqueItems.forEach((item) => {
          dispatch(addItemToBasket(item));
        });

        setTotal(res.data.total_price); // Теперь просто берем total_price из верхнего уровня
      } else {
        console.error('Ожидался массив items, но получен:', res.data);
        alert('Ошибка получения данных корзины. Проверьте, заполнены ли товары в вашей корзине.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Ваш токен доступа истек. Пожалуйста, войдите в систему снова.');
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        console.error('Ошибка получения данных корзины:', error);
        alert('Произошла ошибка при получении данных корзины. Попробуйте снова позже.');
      }
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };



  const handleDeleteItem = async (productId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      dispatch(removeItemFromBasket(productId));
      const response = await axios.delete(`https://koreacenter.kg/api/basket/item/${productId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 204) {
        toast.success('Remove product success')
      }

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
                    <div key={item.product.id} className={styles.basket_card}>
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

              {
                items.length > 0 && (
                  <div className={styles.form}>
                    <h2 className={styles.title}>
                      Для оформления заказа заполните необходимые поля
                    </h2>
                    {open ?
                      <div className="bg-gray-100 w-full min-h-[100px] flex items-center justify-center mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                          {/* Радиокнопки */}
                          <div className="flex items-center mb-4">
                            <input
                              id="pickup"
                              type="radio"
                              name="deliveryMethod"
                              value="pickup"
                              checked={deliveryMethod === "pickup"}
                              onChange={() => setDeliveryMethod("pickup")}
                              className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 cursor-pointer"
                            />
                            <label
                              htmlFor="pickup"
                              className="ml-2 text-lg font-medium text-gray-900"
                            >
                              Самовывоз
                            </label>

                            <input
                              id="delivery"
                              type="radio"
                              name="deliveryMethod"
                              value="delivery"
                              checked={deliveryMethod === "delivery"}
                              onChange={() => setDeliveryMethod("delivery")}
                              className="w-5 h-5 ml-8 text-gray-600 bg-gray-100 border-gray-300 focus:ring-green-500 cursor-pointer"
                            />
                            <label
                              htmlFor="delivery"
                              className="ml-2 text-lg font-medium text-gray-900"
                            >
                              Доставка
                            </label>
                          </div>

                          {/* Поле примечание */}
                          {deliveryMethod === 'pickup' ? (
                            <div
                              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            >
                              <ul>
                                <li>Жалал-абад</li>
                                <li>Аксы</li>
                                <li>ул.Tабалдиев 32/a</li>
                              </ul>
                            </div>
                          ) : deliveryMethod === 'delivery' && (<div
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                          >
                            контакт:0709684854
                          </div>)}
                        </div>
                      </div> : <>
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
                        </div></>}
                    <div className={open ? 'flex flex-row-reverse justify-between items-center' : 'flex justify-between items-center'}>
                      {
                        open ? <button className="bg-regal-red w-full py-[7px] rounded font-semibold text-regal-white">Оформить заказ</button> : <>

                          <button onClick={() => setOpen(true)} className={styles["prev-button"]}>
                            <FaCircleArrowRight />
                          </button>

                        </>
                      }
                      <div className="w-full text-center">
                        <span>{open ? 2 : 1} / 2</span>
                      </div>
                      {
                        open ? (
                          <button onClick={() => setOpen(false)} className={styles["next-button"]}>
                            <FaCircleArrowLeft />
                          </button>
                        ) : ''
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        navigate('/login')
      )}
    </section>
  );
};

export default BasketPage;
