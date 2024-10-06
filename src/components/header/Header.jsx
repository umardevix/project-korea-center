import { useState, useEffect } from "react";
import Burger from "../burger/Burger";
import styles from "./_header.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBasket } from '../../redux/productSlice/ProductSlice';
import axios from 'axios'; // Import axios

function Header() {
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const basketData = useSelector((state) => state.products.basket);

  const totalItemCount = basketData.total_items_count || 0;

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get("/basket/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setBasket(response.data));
      } catch (error) {
        console.error("Error fetching basket data:", error);
      }
    };

    if (user) {
      fetchBasket();
    }
  }, [dispatch, user]);

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
              <img src="/assets/images/image3.png" alt="" />
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
            <Link to="/basket/" className={styles.basket}>
              <div>
                <img src="/assets/images/basket.png" alt="Корзина" />
              </div>
              <span>{totalItemCount}</span> {/* Display total item count */}
            </Link>
            {user ? (
              <div className={styles.user_profile}>
                <Link to="/profile" className={styles.header_login}>
                  <span>{user.first_name}</span> {/* Display user name */}
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
                alt="burger icon"
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
