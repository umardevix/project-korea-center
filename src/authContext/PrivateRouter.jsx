import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ element: Component, adminOnly = false }) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user !== null; // Проверка аутентификации
  const isAdmin = user?.role === "admin"; // Проверка, является ли пользователь администратором

  // Если пользователь не аутентифицирован, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Если требуется администраторский доступ, а пользователь не админ, перенаправляем на страницу "Not Found"
  if (adminOnly && !isAdmin) {
    return <Navigate to="/not-found" />;
  }

  // Если все проверки пройдены, рендерим переданный компонент
  return Component;
};



export default PrivateRoute;

