import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from "../src/layout/Layout.jsx";
import { refreshAccessToken } from './authContext/refreshTokens.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice/userSlice'; // Импортируйте ваши действия Redux
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Установка интервала обновления токена
  useLayoutEffect(() => {
    if (!isLoggedIn) return; // Остановите, если не авторизованы

    const intervalId = setInterval(async () => {
      await refreshAccessToken();
    }, 300000); // Каждые 5 минут

    // Первый вызов при монтировании
    refreshAccessToken();

    return () => clearInterval(intervalId); // Очистка при размонтировании
  }, [isLoggedIn]);

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    dispatch(setUser(null)); // Очистите данные пользователя
    setIsLoggedIn(false); // Установите состояние в false
  };

  return (
    <>
      <ToastContainer />
      <div>
        <Layout onLogout={handleLogout} />
      </div>
    </>
  );
}

export default App;
