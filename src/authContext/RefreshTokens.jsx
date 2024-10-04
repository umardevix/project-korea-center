import axios from 'axios';

// Функция для обновления токенов
export const RefreshTokens = async () => {
	try {
		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken) throw new Error("Refresh token is missing");

		const response = await axios.post('/account/login/refresh', {
			refresh: refreshToken
		});

		const { access, refresh } = response.data;
		localStorage.setItem('access_token', access);
		if (refresh) {
			localStorage.setItem('refresh_token', refresh);
		}

		// Получаем срок действия токена (допустим, 1 час)
		const jwtPayload = JSON.parse(atob(access.split('.')[1]));
		const expirationTime = jwtPayload.exp * 1000; // время в миллисекундах

		// Сохраняем время истечения в localStorage
		localStorage.setItem('access_token_expiration', expirationTime);

		alert('Tokens refreshed successfully');
		return access;
	} catch (error) {
		console.error('Failed to refresh tokens:', error);
		// Перенаправляем на логин, если обновить не удалось
		window.location.href = '/login';
	}
};

// Проверяем, истек ли токен
export const isAccessTokenExpired = () => {
	const expirationTime = localStorage.getItem('access_token_expiration');
	const currentTime = Date.now();

	// Если текущее время больше времени истечения токена, он истек
	return expirationTime && currentTime >= expirationTime;
};

// Axios interceptor для автоматического обновления токенов
axios.interceptors.request.use(async (config) => {
	const accessToken = localStorage.getItem('access_token');

	if (isAccessTokenExpired()) {
		console.log('Access token expired, refreshing...');
		const newAccessToken = await RefreshTokens(); // Обновляем токен
		config.headers['Authorization'] = `Bearer ${newAccessToken}`; // Добавляем новый токен в запрос
	} else if (accessToken) {
		config.headers['Authorization'] = `Bearer ${accessToken}`; // Если токен не истек, используем старый
	}

	return config;
}, (error) => {
	return Promise.reject(error);
});
