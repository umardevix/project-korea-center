import React, { useState } from 'react';
import styles from './_image_uploader.module.scss';

export const ImageUploader = ({ photos, setPhotos }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleAddPhoto = (e) => {
		const file = e.target.files[0];
		if (file && currentIndex < photos.length) {
			const newPhotos = [...photos];
			newPhotos[currentIndex] = file;
			setPhotos(newPhotos);
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}
	};

	return (
		<div>
			<div className={styles.add_product_img_block}>
				{photos.map((photo, index) => (
					<div key={index} className={styles.add_product_img_item}>
						{photo ? (
							<img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} />
						) : (
							<div>
								<img src="/assets/svg/adminImage.svg" alt="placeholder" />
							</div>
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
				<button>Добавить фото</button>
			</label>
		</div>
	);
};
