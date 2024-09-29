import React, { useState } from 'react';
import styles from './_dashboard.module.scss';
import { Link,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Импортируем useSelector
import ProductSection from '../../../components/productSection/ProductSection';

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productCondition, setProductCondition] = useState('all'); // Single value for product condition


  const user = useSelector((state) => state.user.user); // Получаем пользователя из Redux
  const isAdmin = user?.role === 'admin'; // Проверяем, является ли пользователь администратором
  
  // Если пользователь не администратор, перенаправляем на страницу 404
  if (!isAdmin) {
    return <Navigate to="/not-found" />;
  }
  


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleConditionChange = (event) => {
    setProductCondition(event.target.value);
  };

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <div className={styles.dashboard_search}>
          <div className={styles.dashboard_search_input}>
            <div>
              <img src="/assets/svg/searchIcon.svg" alt="Search" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.dashboard_select}>
            <div>
              <p>Состояние товара</p>
              <select value={productCondition} onChange={handleConditionChange}>
                <option value="all">Все</option>
                <option value="new">Новый</option>
                <option value="used">Б/У</option>
              </select>
            </div>
            <Link to={'/admin/addProduct'}>
              <button>Добавить товар</button>
            </Link>
          </div>
        </div>
        {/* Pass searchQuery and productCondition to ProductSection */}
        <ProductSection searchQuery={searchQuery} productCondition={productCondition} />
      </div>
    </div>
  );
};
