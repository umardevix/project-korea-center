import React, { useEffect, useState } from "react";
import styles from "./_category.module.scss";
import CategoryCard from "../categoryCard/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../redux/categoryProduct/categorySlice";

const Category = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  
  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей карточки
  
  const itemsToShow = 4; // Количество видимых карточек
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleNext = () => {
    // Проверяем, не достигли ли мы последней видимой группы карточек
    if (currentIndex < categories.length - itemsToShow) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Переход к следующей карточке
    }
  };

  const handlePrev = () => {
    // Проверяем, не находимся ли мы на первой карточке
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Переход к предыдущей карточке
    }
  };

  return (
    <section className={styles.category}>
      <div className="container">
        <div className={styles.category_block}>
          <h2>Запчасти и аксессуары для вашего автомобиля</h2>

          <div className={styles.carousel}>
            <button
              className={`${styles.prevButton}`} // Исправлено
              onClick={handlePrev}
              disabled={currentIndex === 0} // Отключаем кнопку, если находимся на первой карточке
            >
              &lt;
            </button>
            <div className={styles.carouselWrapper}>
              <div
                className={styles.carouselItems}
                style={{
                  display: 'flex',
                  transition: "transform 0.5s ease-in-out", // Плавный переход
                  transform: `translateX(-${currentIndex * (100/ itemsToShow)}%)`, // Исправлено
                }}
              >
                {categories.map((el, index) => (
                  <div
                    className={styles.carouselItem}
                    key={index}
                    style={{
                      flex: `0 0 calc(100% / ${itemsToShow} - 12px)`, // Количество видимых карточек, исправлено
                      margin: "0 6px", // Отступы между карточками 
                      paddingLeft:"70px"
                    }}
                  >
                    <CategoryCard {...el} />
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`${styles.nextButton}`} // Исправлено
              onClick={handleNext}
              disabled={currentIndex >= categories.length - itemsToShow} // Отключаем кнопку, если находимся на последней группе карточек
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
