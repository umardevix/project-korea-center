import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Провайдер контекста
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функции для логина и логаута
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста
export function useAuth() {
  return useContext(AuthContext);
}
