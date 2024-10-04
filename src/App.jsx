import React, { useEffect } from 'react';
import Layout from "../src/layout/Layout.jsx"
import useTokenRefresh from './hooks/useTokenRefresh.js';
import { useSelector } from 'react-redux';
import { isAccessTokenExpired, RefreshTokens } from './authContext/RefreshTokens.jsx';
function App() {
  useEffect(() => {
    if (isAccessTokenExpired()) {
      RefreshTokens(); // Если токен истек, обновляем его
    }
  }, []);
  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
