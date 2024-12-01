import React, { useEffect, useRef, useState } from "react";
import styles from "./_burger.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdLogIn } from "react-icons/io";

function Burger({ handlePopup }) {
  const ulRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(null);

  // Функция для капитализации первой буквы
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // Парсим данные из localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFirstName(parsedUser.first_name ? capitalizeFirstLetter(parsedUser.first_name) : null);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
                  <Link onClick={() => handlePopup(false)} to="/guarantee">
                    Гарантия
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handlePopup(false)} to="/contact">
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
                <IoMdLogIn />
                <span>Войти</span>
              </Link>
            ) : (
              <Link to="/profile" onClick={() => handlePopup(false)} className={styles.burger_user}>
                <img src="/assets/svg/user.svg" alt="User" />
                <p>{firstName || "Гость"}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Burger;
