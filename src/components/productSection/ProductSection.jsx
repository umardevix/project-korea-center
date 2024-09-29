
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setSearchQuery, setProductCondition } from '../../redux/productSlice/ProductSlice'; // Проверяем импорт
import styles from './_product.module.scss';
import Pagination from '../pagination/Pogination';
import Card from '../card/Card';
import { useLocation, useNavigate } from "react-router-dom";

const ProductSection = ({ searchQuery, productCondition }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Достаем из состояния Redux необходимые данные
  const { filteredProducts, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(3);

  // Загружаем продукты при монтировании компонента
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Обновляем поисковый запрос и условие продукта
  useEffect(() => {
    dispatch(setSearchQuery(searchQuery)); // Устанавливаем поисковый запрос
    dispatch(setProductCondition(productCondition)); // Устанавливаем состояние продукта (новый/б/у)
  }, [dispatch, searchQuery, productCondition]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  console.log(filteredProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <section className={styles.product}>
      <div className="container">
        <div className={styles.product_content}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredProducts.length > 0 ? (
            <>
              {currentItems.map((el) => (
                <Card key={el.id} el={el} location={location} navigate={navigate} />
              ))}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredProducts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
