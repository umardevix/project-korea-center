import { useEffect } from 'react';
import { RefreshTokens } from '../authContext/RefreshTokens';

function useTokenRefresh() {
	useEffect(() => {
		// Функция для обновления токенов каждые 5 минут
		const setupTokenRefresh = () => {
			// Обновляем токены сразу при запуске
			RefreshTokens()

			// Устанавливаем таймер на каждые 5 минут (300 000 миллисекунд)
			const interval = setInterval(() => {
				RefreshTokens();
			}, 5 * 60 * 1000); // 5 минут

			return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
		};

		setupTokenRefresh();
	}, []);
}

export default useTokenRefresh;
