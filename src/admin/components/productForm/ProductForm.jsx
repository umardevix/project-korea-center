import React from 'react';
import styles from './_product_form.module.scss';

export const ProductForm = ({ productData, handleInputChange, categories, handleCategoryChange }) => {
	return (
		<div className={styles.add_product_details}>
			<label>Наименование</label>
			<input name="name" onChange={handleInputChange} value={productData.name} type="text" />

			<label>Модель</label>
			<input name="model" onChange={handleInputChange} value={productData.model} type="text" />

			<label>Marka</label>
			<input name="marka" onChange={handleInputChange} value={productData.marka} type="text" />

			<label>Цена</label>
			<input name="price" onChange={handleInputChange} value={productData.price} type="text" />

			<label>Год</label>
			<input name="year" onChange={handleInputChange} value={productData.year} type="number" />

			<label>Наличие</label>
			<select name="selectStock" value={productData.selectStock} onChange={handleInputChange}>
				<option value={true}>Да</option>
				<option value={false}>Нет</option>
			</select>

			<label>Состояние товара</label>
			<select name="selectedCondition" value={productData.selectedCondition} onChange={handleInputChange}>
				<option value="">Выберите состояние</option>
				<option value="Новый">Новый</option>
				<option value="Б/У">Б/У</option>
			</select>

			<label>Категория</label>
			<select name="category" value={productData.category} onChange={handleCategoryChange}>
				<option value="">Выберите категорию</option>
				{categories.map((ctg) => (
					<option key={ctg.id} value={ctg.id}>{ctg.category}</option>
				))}
				<option value="add">
					Add category
				</option>
			</select>

			{
				productData.category === 'add' && (
					<div className='w-full flex flex-col gap-2'>
						<div className='flex flex-col gap-2'>
							<input className='outline-none p-2 rounded text-sm' type="text" placeholder='Выберите свой категории' />
							<input type="file" />
						</div>
						<button className='bg-blue-500 text-regal-white font-semibold rounded py-1'>Add category</button>
					</div>
				)
			}

			<label>Номер запчасти</label>
			<input name="number" onChange={handleInputChange} value={productData.number} type="text" />

			<label>Артикул</label>
			<input name="artikul" onChange={handleInputChange} value={productData.artikul} type="text" />

			<label>Поколение</label>
			<input name="generation" onChange={handleInputChange} value={productData.generation} type="text" />

			<label>Описание</label>
			<textarea name="description" onChange={handleInputChange} value={productData.description} rows="4" />
		</div>
	);
};
