import React, { useEffect, useState } from 'react';
import styles from './_edit_product.module.scss';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/categoryProduct/categorySlice';


export const EditProductPage = () => {
	const product = useLoaderData()
	const [photos, setPhotos] = useState([null, null, null, null]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [model, setModel] = useState(product.model);
	const [name, setName] = useState(product.title);
	const [number, setNumber] = useState(product.spare_part_number);
	const [description, setDescription] = useState(product.description);
	const [selectedCondition, setSelectedCondition] = useState(product.choice);
	const [price, setPrice] = useState(product.price);
	const [year, setYear] = useState(product.year);
	const [selectStock, setSelectStock] = useState(product.in_stock);
	const [artikul, setArtikul] = useState(product.artikul);
	const [marka, setMarka] = useState(product.marka);
	const [generation, setGeneration] = useState(product.generation);
	const [category, setCategory] = useState(product.category);

	const { categories } = useSelector(state => state.categories)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchCategories())
	}, [dispatch])



	const handleAddPhoto = (e) => {
		const file = e.target.files[0];
		if (file && currentIndex < photos.length) {
			const newPhotos = [...photos];
			newPhotos[currentIndex] = file;
			setPhotos(newPhotos);
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}
	};

	const navigate = useNavigate();

	const updateProduct = async () => {
		if (!name || !model || !price || !category || !selectedCondition) {
			toast.error('Обязательные поля отсутствуют');
			return;
		}

		const formData = new FormData();
		formData.append('choise', selectedCondition);
		formData.append('title', name);
		formData.append('model', model);
		formData.append('spare_part_number', number);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('year', year);
		formData.append('in_stock', selectStock);
		formData.append('artikul', artikul);
		formData.append('marka', marka);
		formData.append('generation', generation);
		formData.append('category', category);

		photos.forEach((photo, index) => {
			if (photo) {
				formData.append(`image${index + 1}`, photo);
			}
		});

		try {
			const response = await axios.patch(`/products/product/${product.id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log(response);


			if (response.status === 200) {
				toast.success('Product updated successfully');
				navigate('/admin');
			}
		} catch (error) {
			console.error('Ошибка при обновлении продукта:', error.response?.data || error.message);
		}
	};
	return (
		<div className="container">
			<div className={styles.add_product}>
				<div className={styles.add_product_title}>
					<p onClick={() => navigate(-1)} className={styles.add_product_info}>
						<img src="/assets/svg/arrow_left.svg" alt="" />Назад
					</p>
					<h1>Изменить товар</h1>
				</div>

				<div className={styles.add_product_block}>
					<div>
						<div className={styles.add_product_img_block}>
							{photos.map((photo, index) => (
								<div key={index} className={styles.add_product_img_item}>
									{photo ? (
										<img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} />
									) : (
										<>
											{product[`image${index + 1}`] ? (
												<img src={product[`image${index + 1}`]} alt={`Image ${index + 1}`} />
											) : (
												<img src="/assets/svg/adminImage.svg" alt="placeholder" />
											)}
										</>
									)}
								</div>
							))}
						</div>
						<label>
							<input
								type="file"
								className="hidden"
								accept="image/*"
								onChange={handleAddPhoto}
							/>
							<button>Изменить фото</button>
						</label>
					</div>

					{/* Section for product details */}
					<div className={styles.add_product_details}>
						<label>Наименование</label>
						<input onChange={(e) => setName(e.target.value)} type="text" value={name} />

						<label>Модель</label>
						<input onChange={(e) => setModel(e.target.value)} type="text" value={model} />

						<label>Marka</label>
						<input onChange={(e) => setMarka(e.target.value)} type="text" value={marka} />

						<label>Цена</label>
						<input onChange={(e) => setPrice(e.target.value)} type="text" value={price} />

						<label>Год</label>
						<input onChange={(e) => setYear(e.target.value)} type="number" value={year} />

						<label>Наличие</label>
						<select value={selectStock} onChange={(e) => setSelectStock(e.target.value)}>
							<option value={true}>Да</option>
							<option value={false}>Нет</option>
						</select>

						<label>Состояние товара</label>
						<select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
							<option value="">Выберите состояние</option>
							<option value="Новый">Новый</option>
							<option value="Б/У">Б/У</option>
						</select>
						{/* Categori */}
						<label>Категория</label>
						<select value={category} onChange={(e) => setCategory(e.target.value)}>
							<option value="">Выберите категорию</option>
							{
								categories.map(ctg => (
									<option key={ctg.id} value={ctg.id}>{ctg.category}</option>
								))
							}
						</select>
						{/* Categori */}


						<label>Номер запчасти</label>
						<input onChange={(e) => setNumber(e.target.value)} type="text" value={number} />

						<label>Артикул</label>
						<input onChange={(e) => setArtikul(e.target.value)} type="text" value={artikul} />

						<label>Поколение</label>
						<input onChange={(e) => setGeneration(e.target.value)} type="text" value={generation} />

						<label>Описание</label>
						<textarea onChange={(e) => setDescription(e.target.value)} rows="4" value={description} />
					</div>
				</div>

				{/* Save button */}
				<div onClick={updateProduct} className={styles.save_product}>
					<button>Сохранить</button>
				</div>
			</div>
		</div>
	)
}



