import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, adminOnly = false }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  // Получаем данные пользователя из Redux
  const isAuthenticated = user !== null; // Проверка аутентификации
  const isAdmin = user?.role === "admin"; // Проверка, является ли пользователь администратором

  if (!isAuthenticated) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу логина
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    // Если пользователь аутентифицирован, но не является админом
    return <Navigate to="/" />; // Перенаправляем на домашнюю страницу
  }

  return Component; // Если все проверки пройдены, рендерим компонент
};

export default PrivateRoute;