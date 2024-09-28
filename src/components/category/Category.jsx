import React, { useEffect } from "react";
import styles from "./_category.module.scss";
import CategoryCard from "../categoryCard/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../redux/categoryProduct/categorySlice";

const Category = () => {
  const { categories } = useSelector((state) => state.categories)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, [dispatch])


  return (
    <section className={styles.category}>
      <div className="container">
        <div className={styles.category_block}>
          <h2>Запчасти и аксессуары для вашего автомобиля</h2>
          <div className={styles.category_item}>
            {
              categories.map(el => (
                <CategoryCard key={el.id} {...el} />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
