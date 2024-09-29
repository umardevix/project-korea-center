// import React, { useState } from "react";
// import styles from "./_login_page.module.scss";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/userSlice/userSlice";

// function LoginPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [togglePassword, setTogglePassword] = useState(false);
//   const [countryCode, setCountryCode] = useState("+996"); // Default country code
//   const [border, setBorder] = useState(true);
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   function formatPhoneNumber(value) {
//     const cleaned = value.replace(/\D/g, "");
//     const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);

//     if (match) {
//       return [match[1], match[2], match[3]].filter(Boolean).join("-");
//     }
//     return value;
//   }

//   function handlePhoneNumberChange(event) {
//     const formattedNumber = formatPhoneNumber(event.target.value);
//     setPhoneNumber(formattedNumber);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   function handleTogglePassword() {
//     setTogglePassword(!togglePassword);
//   }

//   function handleCountryCodeChange(event) {
//     setCountryCode(event.target.value);
//   }

//   // async function postService() {
//   //   try {
//   //     setIsLoading(true); // Start loading
//   //     const res = await axios.post("/account/login/", {
//   //       phone_number: `${countryCode}${phoneNumber.replace(/-/g, "")}`, // Combine country code and formatted phone number
//   //       password: password,
//   //     });

//   //     setBorder(true);
//   //     if (res.status === 200) {
//   //       const accessToken = res.data.access; // Store access token
//   //       localStorage.setItem("accessToken", accessToken); // Save token in localStorage
//   //       const response = await axios.get("/account/user/", {
//   //         headers: {
//   //           Authorization: `Bearer ${accessToken}`,
//   //         },
//   //       });
//   //       if (response.status === 200) {
//   //         dispatch(setUser(response.data)); // Set user in Redux and localStorage
//   //         navigate("/"); // Navigate to home after successful login
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     setBorder(false); // Show error state
//   //   } finally {
//   //     setIsLoading(false); // Stop loading
//   //   }
//   // }
//   async function postService() {
//     try {
//       const res = await axios.post("/account/login/", {
//         phone_number: `${countryCode}${phoneNumber.replace(/-/g, "")}`,
//         password: password,
//       });
  
//       if (res.status === 200) {
//         const accessToken = res.data.access;
//         const response = await axios.get("/account/user/", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
  
//         if (response.status === 200) {
//           const userData = response.data;
//           dispatch(setUser(userData)); // Сохраняем данные пользователя в Redux, включая роль
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

//   function handleSubmit(event) {
//     event.preventDefault();
//     postService();
//   }

//   return (
//     <section className={styles.login_section}>
//       <div className="container">
//         <div className={styles.login_container}>
//           <form onSubmit={handleSubmit} className={styles.login_info}>
//             <div className={styles.login_title}>
//               <h1>Вход</h1>
//               <Link to="/register">Создать аккаунт</Link>
//             </div>
//             <div className={styles.login_inputs}>
//               <div className={`${styles.login_input_1} ${styles.login_input_one}`}>
//                 <span>Номер</span>
//                 <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
//                   <input
//                     type="text"
//                     value={phoneNumber}
//                     onChange={handlePhoneNumberChange}
//                     placeholder="Введите номер телефона"
//                     required
//                   />
//                   <div className={styles.select_dropdown}>
//                     <select onChange={handleCountryCodeChange} value={countryCode}>
//                       <option value="+996">+996</option>
//                       <option value="+7">+7</option>
//                       <option value="+998">+998</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
//                 <span>Пароль</span>
//                 <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
//                   <input
//                     type={togglePassword ? "text" : "password"}
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Введите пароль"
//                     required
//                   />
//                   <span>
//                     <img
//                       onClick={handleTogglePassword}
//                       src={togglePassword ? "/public/assets/svg/eye.svg" : "/public/assets/svg/glass.svg"}
//                       alt=""
//                     />
//                   </span>
//                 </div>
//               </div>
//               <Link to="/forgot">Забыли пароль?</Link>
//             </div>
//             <div className={styles.login_button}>
//               <button type="submit" disabled={isLoading}>
//                 {isLoading ? "Вход..." : "Войти"}
//               </button>
//               {border === false && <small>Неправильные данные! Попробуйте еще раз!</small>}
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginPage;



import React, { useEffect, useState } from "react";
import styles from "./_login_page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Получаем данные пользователя из Redux

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+996"); // Код страны по умолчанию
  const [border, setBorder] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  // Проверка роли пользователя при загрузке компонента
  useEffect(() => {
    if (user) {
      // Если пользователь уже вошел, перенаправляем в зависимости от роли
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/); // Форматируем номер

    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-"); // Объединяем форматированный номер
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

  async function postService() {
    try {
      setIsLoading(true); // Начинаем загрузку
      const res = await axios.post("/account/login/", {
        phone_number: `${countryCode}${phoneNumber.replace(/-/g, "")}`, // Объединяем код страны и номер телефона
        password: password,
      });

      setBorder(true);
      if (res.status === 200) {
        const accessToken = res.data.access; // Получаем токен доступа
        localStorage.setItem("accessToken", accessToken); // Сохраняем токен в localStorage
        if (!accessToken) {
          alert("Вы не вошли в систему! Пожалуйста, войдите.");
          navigate("/login");
          return;
        }
          
        const response = await axios.get("/account/user/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовки запроса
          },
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch(setUser(userData)); // Сохраняем данные пользователя в Redux

          // Перенаправление в зависимости от роли
          if (userData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      setBorder(false); // Показать ошибку

      // Обратная связь об ошибке
      if (error.response && error.response.status === 401) {
        alert("Неправильные данные! Пожалуйста, проверьте свой номер и пароль.");
      } else {
        alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
      }
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    postService(); // Вызываем функцию отправки
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
