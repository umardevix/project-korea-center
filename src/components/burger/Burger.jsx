import React, { useEffect, useRef } from "react";
import styles from "./_burger.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Burger({ handlePopup }) {
  const ulRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    function handleRef(event) {
      if (ulRef.current && !ulRef.current.contains(event.target)) {
        handlePopup(false);
      }
    }

    document.addEventListener("click", handleRef);
    return () => {
      document.removeEventListener("click", handleRef);
    };
  }, [ulRef, handlePopup]);

  return (
    <div className={styles.burger}>
      <div className={styles.burger_global}>
        <div className={styles.burger_container}>
          <div ref={ulRef} className={styles.burger_info}>
            <nav>
              <ul>
                <li>
                  <Link onClick={() => handlePopup(false)} to="/">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handlePopup(false)} to="/about">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handlePopup(false)} to="#">
                    Гарантия
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handlePopup(false)} to="/productid">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handlePopup(false)} to="#">
                    Контакты
                  </Link>
                </li>
              </ul>
            </nav>

            {user === null ? (
              <Link
                onClick={() => handlePopup(false)}
                to="/login"
                className={styles.header_login}
              >
                <img
                  src="../../../public/assets/svg/login.svg"
                  alt="login icon"
                />
                <span>Войти</span>
              </Link>
            ) : (
              <img src="/assets/svg/Vector.svg" alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Burger;
