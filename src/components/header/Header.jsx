import { useState, useEffect } from "react";
import Burger from "../burger/Burger";
import styles from "./_header.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBasket } from '../../redux/productSlice/ProductSlice';
import axios from 'axios';

function Header() {
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  
  // Извлекаем данные пользователя и корзины из Redux Store
  const user = useSelector((state) => state.user.user); // Если user уже является объектом, не нужно использовать дополнительное свойство
  const basketData = useSelector((state) => state.products.basket);

  // Общее количество товаров в корзине
  const totalItemCount = basketData.total_items_count || 0;

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        // Убедитесь, что вы используете правильный URL для API
        const response = await axios.get("https://koreacenter.kg/api/basket/", { // Добавьте полный URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Обновляем состояние корзины в Redux Store
        dispatch(setBasket(response.data));
      } catch (error) {
        console.error("Ошибка при получении данных корзины:", error);
      }
    };

    // Запрашиваем корзину только если пользователь авторизован
    if (user) {
      fetchBasket();
    }
  }, [dispatch, user]);

  // Сохраняем данные корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketData));
  }, [basketData]);

  const handlePopup = (value) => {
    setPopup(value);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_container}>
          <div className={styles.header_logo}>
            <Link to="/">
              <img src="/assets/images/image3.png" alt="Логотип" />
            </Link>
          </div>
          <nav className={styles.header_menu}>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/guarantee">Гарантия</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </nav>
          <div className={styles.header_right}>
            <Link to="/basket" className={styles.basket}>
              <div>
                <img src="/assets/images/basket.png" alt="Корзина" />
              </div>
              <span>{totalItemCount}</span> {/* Отображаем общее количество товаров */}
            </Link>
            {user ? (
              <div className={styles.user_profile}>
                <Link to="/profile" className={styles.header_login}>
                  <span>{user.first_name}</span> {/* Отображаем имя пользователя */}
                </Link>
              </div>
            ) : (
              <Link to="/login" className={styles.header_login}>
                <img src="/assets/svg/login.svg" alt="Войти" />
                <span>Войти</span>
              </Link>
            )}
            <div className={styles.header_burger}>
              <img
                onClick={(event) => {
                  event.stopPropagation();
                  setPopup(true);
                }}
                src="/assets/images/burger.png"
                alt="иконка бургер-меню"
              />
              {popup && <Burger handlePopup={handlePopup} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
