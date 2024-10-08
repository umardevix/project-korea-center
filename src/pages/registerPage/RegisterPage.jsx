import React, { useState } from "react";
import styles from "./_register_page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [uncow, setUncow] = useState(false);
  const [countryCode, setCountryCode] = useState("+996"); // Default country code
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "", // Empty string by default
    password_confirm: "",
  });

  function handleToggleOne() {
    setToggle(!toggle);
  }

  function handleToggleTwo() {
    setToggleTwo(!toggleTwo);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.password === user.password_confirm) {
        const isValidNumber = user.phone_number.length > 0;
        const isValidName = user.first_name.length > 0;
        const isValidPassword = user.password.length >= 6;

        setUncow(false);

        // Проверка всех обязательных полей перед отправкой
        if (isValidNumber && isValidName && isValidPassword) {
          const formattedUser = {
            ...user,
            phone_number: `${countryCode}${user.phone_number.replace(/\D/g, "")}`, // Убираем любые символы, кроме цифр
          };
          sendRegistrationData(formattedUser);
        } else {
          if (!isValidName) alert("Имя обязательно для заполнения");
          if (!isValidNumber) alert("Номер телефона обязателен для заполнения");
          if (!isValidPassword) alert("Пароль должен быть не менее 6 символов");
        }
      } else {
        setUncow(true);
        alert("Пароли не совпадают");
      }
    } catch (error) {
      console.log("Ошибка при регистрации:", error);
    }
  }

  async function sendRegistrationData(data) {
    try {
      const res = await axios.post("/account/register/", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 201) {
        const formattedPhoneNumber = `${countryCode}${user.phone_number.replace(/\D/g, "")}`;
        navigate("/otp", { state: { phone_number: formattedPhoneNumber } });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Проверяем наличие ошибки по номеру телефона
        if (error.response.data.phone_number) {
          // Показываем алерт, если номер уже существует
          alert("Пользователь с таким номером телефона уже существует.");
        } else {
          // Показываем общую ошибку, если другая проблема
          alert("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.");
        }
      } else {
        console.error("Ошибка при отправке данных регистрации:", error.message);
      }
    }
  }


  return (
    <section className={styles.login_section}>
      <div className="container">
        <div className={styles.login_container}>
          <form onSubmit={handleSubmit} className={styles.login_info}>
            <div className={styles.login_title}>
              <h1>Регистрация</h1>
              <Link to="/login">Вход</Link>
            </div>
            <div className={styles.login_inputs}>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Имя</span>
                <div className={styles.login_input}>
                  <input
                    onChange={handleChange}
                    name="first_name"
                    value={user.first_name}
                    type="text"
                  />
                </div>
              </div>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Фамилия</span>
                <div className={styles.login_input}>
                  <input
                    onChange={handleChange}
                    name="last_name"
                    value={user.last_name}
                    type="text"
                  />
                </div>
              </div>
              <div className={`${styles.login_input_1} ${styles.login_input_one}`}>
                <span>Номер</span>
                <div className={styles.login_input}>
                  <input
                    onChange={handleChange}
                    name="phone_number"
                    value={user.phone_number}
                    type="text"
                  />
                  <div className={styles.select_dropdown}>
                    <select onChange={handleCountryCodeChange} value={countryCode}>
                      <option value="+996">+996</option>
                      <option value="+7">+7</option>
                      <option value="+998">+998</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Пароль</span>
                <div className={styles.login_input}>
                  <input
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    type={toggle ? "text" : "password"}
                    className={uncow ? styles.login_input_error : styles.login_input_success}
                  />
                  <span className="flex items-center mt-[2px] cursor-pointer" onClick={handleToggleOne}>
                    {
                      toggle ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />
                    }
                  </span>
                </div>
              </div>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Повторить пароль</span>
                <div className={styles.login_input}>
                  <input
                    onChange={handleChange}
                    name="password_confirm"
                    value={user.password_confirm}
                    type={toggleTwo ? "text" : "password"}
                    className={uncow ? styles.login_input_error : styles.login_input_success}
                  />
                  <span className="flex items-center mt-[2px] cursor-pointer" onClick={handleToggleTwo}>
                    {
                      toggleTwo ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.login_button}>
              <button type="submit">Регистрация</button>
              {uncow && <small>Пароли не совпадают</small>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
