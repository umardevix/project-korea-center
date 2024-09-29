import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const deleteBasket = createAsyncThunk('basket/delete', async () => {
  const response = await axios.delete('http://130.211.125.242/basket/basket/'); // Adjust the URL as needed
  return response.data;
});

const initialState = {
    items: [], // Массив товаров в корзине
    total: 0,  // Общая сумма товаров
  };
  
  const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
      addItemToBasket: (state, action) => {
        const item = action.payload;
        const existsInBasket = state.items.some(basketItem => basketItem.product.id === item.product.id);
        
        if (!existsInBasket) {
          state.items.push(item); // Добавляем товар в корзину
          state.total += item.price; // Увеличиваем общую сумму
        }
      },
      removeItemFromBasket: (state, action) => {
        const itemId = action.payload;
        const itemIndex = state.items.findIndex((item) => item.product.id === itemId);
        if (itemIndex >= 0) {
          state.total -= state.items[itemIndex].price; // Уменьшаем общую сумму
          state.items.splice(itemIndex, 1); // Удаляем товар
        }
      },
      clearBasket: (state) => {
        state.items = []; // Очищаем массив товаров
        state.total = 0; // Сбрасываем общую сумму
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteBasket.fulfilled, (state) => {
          // handle the state after deletion, if necessary
        });
    },
  });
  
  export const { addItemToBasket, removeItemFromBasket, clearBasket } = basketSlice.actions;
  
  export default basketSlice.reducer;
  