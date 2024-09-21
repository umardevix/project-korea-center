import React, { useEffect, useState } from "react";
import styles from "./_register_page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "phone_number") {
      const formattedNumber = formatPhoneNumber(value);
      setUser((prevUser) => ({
        ...prevUser,
        [name]: formattedNumber,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  }

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.password === user.password_confirm) {
        const isValidNumber = user.phone_number.replace(/-/g, "");
        const isValidName = user.first_name.length >= 4;
        const isValidPassword = user.password.length >= 6;

        setUncow(false);
        if (isValidNumber && isValidName && isValidPassword) {
          const formattedUser = {
            ...user,
            phone_number: `${countryCode}${user.phone_number.replace(/-/g, "")}`,
          };
          sendRegistrationData(formattedUser);
        } else {
          console.log("Validation failed: Please ensure all fields meet the required criteria.");
        }
      } else {
        setUncow(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendRegistrationData(data) {
    try {
      const res = await axios.post("/account/register/", data);
      console.log(res);
      if (res.status === 201) {
        const formattedPhoneNumber = `${countryCode}${user.phone_number.replace(/-/g, "")}`;
        navigate("/otp", { state: { phone_number: formattedPhoneNumber } });
      }
    } catch (error) {
      console.log(error);
      console.log(data)
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
                    type="text" // Use text to allow for formatting
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
                    className={
                      uncow
                        ? styles.login_input_error
                        : styles.login_input_success
                    }
                  />
                  <span>
                    <img
                      onClick={handleToggleOne}
                      src={
                        toggle
                          ? "/public/assets/svg/eye.svg"
                          : "/public/assets/svg/glass.svg"
                      }
                      alt=""
                    />
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
                    className={
                      uncow
                        ? styles.login_input_error
                        : styles.login_input_success
                    }
                  />
                  <span>
                    <img
                      onClick={handleToggleTwo}
                      src={
                        toggleTwo
                          ? "/public/assets/svg/eye.svg"
                          : "/public/assets/svg/glass.svg"
                      }
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div className={styles.remember}>
                <img src="/public/assets/svg/box.svg" alt="" />
                <p>Запомнить меня</p>
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
