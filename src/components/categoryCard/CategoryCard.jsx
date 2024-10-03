import React from 'react';
import styles from './_categoryCard.module.scss';
import { useDispatch } from 'react-redux';
import { setSelectedMarka, filterProducts, setSelectedCategories } from '../../redux/productSlice/ProductSlice';

const CategoryCard = ({ id, category, image }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedCategories(id));
		dispatch(filterProducts());
	};

	return (
		<div onClick={handleClick} className={styles.category_card}>
			<div className={styles.category_img}>
				<img src={image} alt={`Category ${category}`} /> {/* Добавлен alt текст */}
			</div>
			<div className={styles.category_btn_info}>
				<div className={styles.category_btn}>
					<span>{category}</span>
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;