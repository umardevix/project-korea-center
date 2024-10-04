import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navigation() {
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin"; // Проверяем роль

  console.log(user?.role);


  return (
    <nav>
      {/* Другие ссылки */}
      {isAdmin && <Link to="/admin">Admin Page</Link>} {/* Отображаем ссылку только для админов */}
    </nav>
  );
}

export default Navigation;
