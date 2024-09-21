import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./_new_password.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Extract phone_number and verification_code from location state
  const phoneNumber = location.state?.phone_number || "";
  const verificationCode = location.state?.verification_code || "";

  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePasswordTwo, setTogglePasswordTwo] = useState(false);
  const [border, setBorder] = useState(true);
  const [error, setError] = useState("");

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePasswordTwoChange(event) {
    setPasswordTwo(event.target.value);
  }

  function handleTogglePassword() {
    setTogglePassword(!togglePassword);
  }

  function handleTogglePasswordTwo() {
    setTogglePasswordTwo(!togglePasswordTwo);
  }

  async function postService() {
    try {
      const res = await axios.post("/account/forgot-password/reset/", {
        phone_number: phoneNumber,
        new_password: password,
        confirm_password: passwordTwo,
        verification_code: verificationCode
      });
      console.log(res)

      if (res.status === 200) {
        navigate("/login");
      }
      
    } catch (error) {
      console.log({   phoneNumber,password, passwordTwo,verificationCode})
      console.error(error);
      setBorder(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError(""); 

    if (password === "" || passwordTwo === "") {
      setError("Пароль не может быть пустым");
      return;
    }

    if (password !== passwordTwo) {
      setError("Пароли не совпадают");
      return;
    }

    postService();
  }

  return (
    <section className={styles.login_section}>
      <div className="container">
        <div className={styles.new_password_container}>
          <form onSubmit={handleSubmit} className={styles.login_info}>
            <div className={styles.login_title}>
              <h1>Создание нового пароля</h1>
            </div>
            <div className={styles.login_inputs}>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Новый пароль</span>
                <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
                  <input
                    type={togglePassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span>
                    <img
                      onClick={handleTogglePassword}
                      src={togglePassword ? "/public/assets/svg/eye.svg" : "/public/assets/svg/glass.svg"}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <span>Подтверждение пароля</span>
                <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
                  <input
                    type={togglePasswordTwo ? "text" : "password"}
                    value={passwordTwo}
                    onChange={handlePasswordTwoChange}
                  />
                  <span>
                    <img
                      onClick={handleTogglePasswordTwo}
                      src={togglePasswordTwo ? "/public/assets/svg/eye.svg" : "/public/assets/svg/glass.svg"}
                      alt=""
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.login_button}>
              <button type="submit">Войти</button>
              {error && <small>{error}</small>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewPassword;
