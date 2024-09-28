import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для получения категорий
// export const fetchCategories = createAsyncThunk(
//     'categories/fetchCategories',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get('/products/categories/');
//             return response.data; // Возвращаем полученные данные
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message); // Обработка ошибок
//         }
//     }
// );

// Асинхронный thunk для добавления новой категории
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('category', categoryData.name); // Название категории
            if (categoryData.image) {
                formData.append('image', categoryData.image); // Изображение, если есть
            }

            const response = await axios.post('/products/categories/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data; // Возвращаем созданную категорию
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Обработка ошибок
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchCategories.pending, (state) => {
            //     state.loading = true; // Устанавливаем состояние загрузки
            // })
            // .addCase(fetchCategories.fulfilled, (state, action) => {
            //     state.loading = false; // Убираем состояние загрузки
            //     state.categories = action.payload; // Обновляем категории
            // })
            // .addCase(fetchCategories.rejected, (state, action) => {
            //     state.loading = false; // Убираем состояние загрузки
            //     state.error = action.payload; // Устанавливаем ошибку
            // })
            .addCase(addCategory.pending, (state) => {
                state.loading = true; // Устанавливаем состояние загрузки
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false; // Убираем состояние загрузки
                state.categories.push(action.payload); // Добавляем новую категорию
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false; // Убираем состояние загрузки
                state.error = action.payload; // Устанавливаем ошибку
            });
    },
});

export default categorySlice.reducer;
