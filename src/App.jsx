import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from "../src/layout/Layout.jsx";
import { refreshAccessToken } from './authContext/refreshTokens.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice/userSlice'; // Импортируйте ваши действия Redux

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Установка интервала обновления токена
  useLayoutEffect(() => {
    if (!isLoggedIn) return; // Остановите, если не авторизованы

    const intervalId = setInterval(async () => {
      await refreshAccessToken();
    }, 3000); // Каждые 5 минут

    // Первый вызов при монтировании
    refreshAccessToken();

    return () => clearInterval(intervalId); // Очистка при размонтировании
  }, [isLoggedIn]);

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setUser(null)); // Очистите данные пользователя
    setIsLoggedIn(false); // Установите состояние в false
  };

  return (
    <div>
      <Layout onLogout={handleLogout} />
    </div>
  );
}

export default App;
