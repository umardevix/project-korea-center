import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Провайдер контекста
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Состояние для хранения данных пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для логина с учетными данными
  const login = (userData) => {
    setUser(userData); // Сохраняем данные пользователя
    setIsAuthenticated(true);
  };

  // Функция для логаута
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста
export function useAuth() {
  return useContext(AuthContext);
}
