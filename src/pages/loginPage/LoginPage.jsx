import React, { useEffect, useState } from "react";
import styles from "./_login_page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+996");
  const [border, setBorder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  }

  function handlePhoneNumberChange(event) {
    const formattedNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedNumber);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleTogglePassword() {
    setTogglePassword(!togglePassword);
  }

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return null; // Нет refresh token, не можем обновить
    }

    try {
      const response = await axios.post("/account/login/refresh", {
        token: refreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      return null; // Обработка ошибки
    }
  };

  const isAccessTokenExpired = () => {
    const accessToken = localStorage.getItem("accessToken");
    // Здесь добавьте вашу логику проверки срока действия токена
    return !accessToken; // Заглушка, замените вашей логикой
  };

  async function postService() {
    try {
      setIsLoading(true);
      const res = await axios.post("/account/login/", {
        phone_number: `${countryCode}${phoneNumber.replace(/-/g, "")}`,
        password: password,
      });

      setBorder(true);
      if (res.status === 200) {
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Получение данных пользователя
        await makeApiCall("/account/user/"); // Здесь мы используем makeApiCall

        // Перенаправление уже происходит в makeApiCall
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      setBorder(false);

      if (error.response && error.response.status === 401) {
        alert("Неправильные данные! Пожалуйста, проверьте свой номер и пароль.");
      } else {
        alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const makeApiCall = async (endpoint) => {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken || isAccessTokenExpired()) {
      accessToken = await refreshAccessToken();
    }

    if (accessToken) {
      try {
        const apiResponse = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = apiResponse.data; // Обрабатываем полученные данные
        dispatch(setUser(userData)); // Сохраняем данные пользователя в Redux

        // Перенаправление в зависимости от роли
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Ошибка при вызове API:", error);
      }
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    postService();
  }

  return (
    <section className={styles.login_section}>
      <div className="container">
        <div className={styles.login_container}>
          <form onSubmit={handleSubmit} className={styles.login_info}>
            <div className={styles.login_title}>
              <h1>Вход</h1>
              <Link to="/register">Создать аккаунт</Link>
            </div>
            <div className={styles.login_inputs}>
              <div className={`${styles.login_input_1} ${styles.login_input_one}`}>
                <span>Номер</span>
                <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Введите номер телефона"
                    required
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
                <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
                  <input
                    type={togglePassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Введите пароль"
                    required
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
              <Link to="/forgot">Забыли пароль?</Link>
            </div>
            <div className={styles.login_button}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </button>
              {border === false && <small>Неправильные данные! Попробуйте еще раз!</small>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
