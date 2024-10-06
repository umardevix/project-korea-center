import axios from 'axios';
import store from '../redux/store'; // Импортируйте ваш store для использования dispatch
import { setUser } from '../redux/userSlice/userSlice';

export const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) {
		console.warn('Нет refresh токена.');
		return null;
	}

	try {
		const response = await axios.post('/account/login/refresh/', {
			refresh: refreshToken,
		}, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const newAccessToken = response.data.access;
		if (newAccessToken) {
			localStorage.setItem('accessToken', newAccessToken);

			// После обновления токена, получите данные пользователя
			await fetchUserData(newAccessToken);
			return newAccessToken; // Возвращаем новый токен
		} else {
			console.warn('Не удалось обновить токен.');
			return null;
		}
	} catch (error) {
		console.error('Ошибка при обновлении токена:', error);
		return null;
	}
};

// Функция для получения данных пользователя
const fetchUserData = async (accessToken) => {
	try {
		const response = await axios.get('/account/user/', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const userData = response.data;
		store.dispatch(setUser(userData)); // Обновите состояние пользователя в Redux
	} catch (error) {
		console.error('Ошибка при получении данных пользователя:', error);
	}
};
