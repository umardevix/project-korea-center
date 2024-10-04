import React, { useEffect, useRef, useState } from "react";
import styles from "./_category.module.scss";
import CategoryCard from "../categoryCard/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categoryProduct/categorySlice";

const Category = () => {
  const isRef = useRef(null);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей карточки
  const [itemsToShow, setItemsToShow] = useState(4); // Количество видимых карточек
  const [canScrollNext, setCanScrollNext] = useState(true); // Возможность скролла вправо

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Обновляем количество видимых карточек в зависимости от ширины экрана
    const handleResize = () => {
      if (isRef.current) {
        const containerWidth = isRef.current.clientWidth;
        const itemWidth = isRef.current.scrollWidth / categories.length;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        setItemsToShow(visibleItems > 0 ? visibleItems : 1);
      }
    };

    handleResize(); // Устанавливаем начальное значение
    window.addEventListener("resize", handleResize); // Обновляем при изменении размера окна

    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  useEffect(() => {
    if (isRef.current) {
      // Проверяем, можем ли еще скроллить вправо
      const maxIndex = Math.max(0, categories.length - itemsToShow);
      setCanScrollNext(currentIndex < maxIndex);
    }
  }, [currentIndex, itemsToShow, categories]);

  const handleNext = () => {
    if (canScrollNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className={styles.category}>
      <div className="container">
        <div className={styles.category_block}>
          <h2>Запчасти и аксессуары для вашего автомобиля</h2>

          <div className={styles.carousel}>
            {/* <button
              className={`${styles.prevButton}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &lt;
            </button> */}
            <div className={styles.carouselWrapper}>
              <div
                ref={isRef}
                className={styles.carouselItems}
                style={{
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                }}
              >
                {categories.map((el, index) => (
                  <div
                    className={styles.carouselItem}
                    key={index}
                  >
                    <CategoryCard {...el} />
                  </div>
                ))}

              </div>
            </div>

            {/* <button
              className={`${styles.nextButton}`}
              onClick={handleNext}
              disabled={!canScrollNext}
            >
              &gt;
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
