import { useEffect, useState } from "react";
import Burger from "../burger/Burger";
import styles from "./_header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {
  const [popup, setPopup] = useState(false);

  const { products } = useSelector((state) => state.products)
  const [isnumber, setIsNumber] = useState(0)


  const handlePopup = (value) => {
    setPopup(value);
  };

  return (
    <>
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
                <li>
                  <Link to="/">Главная</Link>
                </li>
                <li>
                  <Link to="/about">О нас</Link>
                </li>
                <li>
                  <Link to="/guarantee">Гарантия</Link>
                </li>
                <li>
                  <Link to="/productid">Доставка</Link>
                </li>
                <li>
                  <Link to="/contact">Контакты</Link>
                </li>
              </ul>
            </nav>
            <div className={styles.header_right}>
              <Link to="/basket" className={styles.basket}>
                <div>
                  <img src="/assets/images/basket.png" alt="" />
                </div>
                <span>0</span>
              </Link>
              <Link to="/login" className={styles.header_login}>
                <img src="/assets/svg/login.svg" alt="" />
                <span>Войти</span>
              </Link>
              <div className={styles.header_burger}>
                <img
                  onClick={(event) => {
                    event.stopPropagation()
                    setPopup(true)
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

    </>
  );
}

export default Header;
