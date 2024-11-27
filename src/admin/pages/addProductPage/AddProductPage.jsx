import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../redux/categoryProduct/categorySlice';
import { toast } from 'react-toastify';
import { ImageUploader } from '../../components/imageUploader/ImageUploader';
import { ProductForm } from '../../components/productForm/ProductForm';
import styles from './_add_product.module.scss';
import { addProduct } from '../../../redux/productSlice/ProductSlice';
import { addCategory } from '../../../redux/categoryProduct/categorySlice';



export const AddProductPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newCategory, setNewCategory] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
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
	const handleAddCategory = () => {
		if (newCategory) {
			const categoryData = {
				name: newCategory,
				image: selectedImage, // Здесь передаем выбранное изображение
			};

			dispatch(addCategory(categoryData))
				.unwrap() // Если вы используете createAsyncThunk
				.then(() => {
					setNewCategory(''); // Очищаем поле ввода
					setSelectedImage(null); // Очищаем изображение
					toast.success('Категория успешно добавлена!');
				})
				.catch((error) => {
					console.error('Ошибка при добавлении категории:', error);
					toast.error('Не удалось добавить категорию. Проверьте введённые данные.');
				});
		} else {
			toast.error('Введите название категории');
		}
	};
	const handleAddProduct = () => {
		// Проверка обязательных полей
		if (!productData.name || !productData.model || !productData.price || !productData.category) {
			toast.error('Заполните все обязательные поля');
			return;
		}

		// Создаем FormData для отправки данных продукта
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

		// Добавляем изображения с проверкой формата
		photos.forEach((photo, index) => {
			if (photo instanceof File) {
				// Проверка типа файла
				if (['image/jpeg', 'image/png'].includes(photo.type)) {
					formData.append(`image${index + 1}`, photo);
				} else {
					console.warn(`Файл image${index + 1} имеет неподдерживаемый тип: ${photo.type}`);
					toast.error(`Файл image${index + 1} должен быть в формате JPEG или PNG.`);
				}
			}
		});

		// Отправка запроса на добавление продукта
		dispatch(addProduct(formData))
			.unwrap()
			.then(() => {
				toast.success('Продукт успешно добавлен!');
				navigate('/admin')
			})
			.catch((error) => {
				console.error('Ошибка при добавлении продукта:', error.response?.data || error.message);
				toast.error('Не удалось добавить продукт. Проверьте введённые данные.');
			});
	};




	return (
		<div className="container">
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
						addCategory={handleAddCategory} // Передача функции добавления категории
						newCategory={newCategory} // Передача состояния новой категории
						setNewCategory={setNewCategory}
						setSelectedImage={setSelectedImage} // Функция для обновления состояния
					/>
				</div>
				<div className={styles.save_product}>
					<button onClick={handleAddProduct}>Сохранить</button>
				</div>
			</div>
		</div>
	);
};