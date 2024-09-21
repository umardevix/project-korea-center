import React from 'react';
import { useAuth } from './authContext/AuthContext.jsx';  // Импортируйте хук useAuth
import Layout from "../src/layout/Layout.jsx"
function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
