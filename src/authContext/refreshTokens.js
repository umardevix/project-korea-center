import axios from 'axios';
import store from '../redux/store';
import { setUser } from '../redux/userSlice/userSlice';
import { Navigate } from 'react-router-dom';

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    store.dispatch(setUser(null)); // Сброс состояния пользователя
	return <Navigate to="/login" />;
};

export const initializeAuth = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        const accessToken = await refreshAccessToken();
        if (accessToken) {
            console.log('Доступ восстановлен');
            return;
        }
    }
    console.warn('Пользователь не авторизован');
    store.dispatch(setUser(null));
};

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
            headers: { 'Content-Type': 'application/json' },
        });

        const newAccessToken = response.data.access;
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            await fetchUserData(newAccessToken);
            return newAccessToken;
        } else {
            console.warn('Не удалось обновить токен.');
			logout()
            return null;
        }
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
		logout()
		
        return null;
    }
};

const fetchUserData = async (accessToken) => {
    try {
        const response = await axios.get('/account/user/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userData = response.data;
        store.dispatch(setUser(userData));
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
    }
};
