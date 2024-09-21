import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../redux/categoryProduct/categorySlice';
import { toast, ToastContainer } from 'react-toastify';
import { ImageUploader } from '../../components/imageUploader/ImageUploader';
import { ProductForm } from '../../components/productForm/ProductForm';
import styles from './_add_product.module.scss';
import { addProduct } from '../../../redux/productSlice/ProductSlice';



export const AddProductPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categories);
	const [photos, setPhotos] = useState([null, null, null, null]);
	const [productData, setProductData] = useState({
		name: '',
		model: '',
		number: '',
		description: '',
		selectedCondition: '',
		price: '',
		year: '',
		selectStock: true,
		artikul: '',
		marka: '',
		generation: '',
		category: '',
	});

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	// Уведомление об ошибках загрузки категорий
	useEffect(() => {
		if (categoriesError) {
			toast.error(categoriesError);
		}
	}, [categoriesError]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProductData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleCategoryChange = (e) => {
		const { value } = e.target;
		setProductData(prevData => ({ ...prevData, category: value }));
	};

	const handleAddProduct = () => {
		if (!productData.name || !productData.model || !productData.price || !productData.category) {
			toast.error('Заполните все обязательные поля');
			return;
		}

		const formData = new FormData();
		formData.append('title', productData.name);
		formData.append('model', productData.model);
		formData.append('spare_part_number', productData.number);
		formData.append('description', productData.description);
		formData.append('choice', productData.selectedCondition);
		formData.append('price', Number(productData.price));
		formData.append('year', Number(productData.year));
		formData.append('in_stock', productData.selectStock);
		formData.append('artikul', productData.artikul);
		formData.append('marka', productData.marka);
		formData.append('generation', productData.generation);
		formData.append('category', productData.category);

		photos.forEach((photo, index) => {
			if (photo instanceof File) {
				formData.append(`image${index + 1}`, photo);
			}
		});

		dispatch(addProduct(formData))
			.then(() => {
				toast.success('Продукт успешно добавлен!');
				navigate('/admin')
			})
			.catch((error) => {
				console.error('Ошибка при добавлении продукта:', error);
				toast.error('Не удалось добавить продукт. Проверьте введённые данные.');
			});
	};



	return (
		<div className="container">
			<ToastContainer />
			<div className={styles.add_product}>
				<div onClick={() => navigate(-1)} className={styles.add_product_title}>
					<p><img src="/assets/svg/arrow_left.svg" alt="" /> Назад</p>
					<h1>Добавить товар</h1>
				</div>
				<div className={styles.add_product_block}>
					<ImageUploader photos={photos} setPhotos={setPhotos} />
					<ProductForm
						productData={productData}
						handleInputChange={handleInputChange}
						categories={categories}
						handleCategoryChange={handleCategoryChange}
					/>
				</div>
				<div className={styles.save_product}>
					<button onClick={handleAddProduct}>Сохранить</button>
				</div>
			</div>
		</div>
	);
};
