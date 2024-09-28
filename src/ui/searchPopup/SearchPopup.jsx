import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSelectedMarka, setSelectedModel, setSelectedGeneration, setSelectedArticul, filterProducts, resetFilters } from '../../redux/productSlice/ProductSlice';



import { useEffect, useState } from 'react';
import styles from './_search_popup.module.scss';

export const SearchPopup = () => {
	const [popup, setPopup] = useState(false);
	const dispatch = useDispatch();
	const { filteredProducts, products, selectedMarka, selectedModel, selectedGeneration, loading, error } = useSelector(state => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleSearch = () => {
		dispatch(filterProducts());
	};

	const handleReset = () => {
		dispatch(resetFilters());
	};





	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className={styles.search_form}>
			<select className={styles.search_select} value={selectedMarka} onChange={(e) => dispatch(setSelectedMarka(e.target.value))}>
				<option value="">Выберите марку</option>
				{
					products.map(el => (
						<option key={el.id} value={el.marka}>{el.marka}</option>
					))
				}
			</select>

			<select className={styles.search_select} value={selectedModel} onChange={(e) => dispatch(setSelectedModel(e.target.value))}>
				<option value="">Выберите модель</option>
				{
					products.map(el => (
						<option key={el.id} value={el.model}>{el.model}</option>
					))
				}
			</select>

			<select className={styles.search_select} value={selectedGeneration} onChange={(e) => dispatch(setSelectedGeneration(e.target.value))}>
				<option value="">Выберите поколение</option>
				{
					products.map(el => (
						<option key={el.id} value={el.generation}>{el.generation}</option>
					))
				}
			</select>

			<div>
				<div onClick={() => setPopup(prev => !prev)} className={styles.search_input}>
					<img src="/assets/svg/arrowGo.svg" alt="" />
					<h2>Дополнительные параметры </h2>
				</div>
				{
					popup && <div className={styles.search_input_item}>
						<div>
							<input
								placeholder='Год, c'
								type="number"

							/>
							<input
								placeholder='Год, по'
								type="number"

							/>
						</div>
						<input onChange={(e) => dispatch(setSelectedArticul(e.target.value))} placeholder='Артикул' type="text" />
					</div>
				}
			</div>

			<button className={styles.search_btn} onClick={handleSearch}>Поиск</button>
			<button className={styles.clear_btn} onClick={handleReset}>Сбросить</button>
		</div>
	)
}
