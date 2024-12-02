import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteBasket = createAsyncThunk("basket/delete", async () => {
  const response = await axios.delete("/api/basket/"); // Adjust the URL as needed
  return response.data;
});

const initialState = {
  items: [], // Массив товаров в корзине
  total: 0, // Общая сумма товаров
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const item = action.payload;
      const existsInBasket = state.items.some(
        (basketItem) => basketItem.product.id === item.product.id
      );

      if (!existsInBasket) {
        state.items.push(item); // Добавляем товар в корзину
        state.total += item.price; // Увеличиваем общую сумму
      }
    },
    removeItemFromBasket: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === itemId
      );
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
    builder.addCase(deleteBasket.fulfilled, (state) => {
      // handle the state after deletion, if necessary
    });
  },
});

export const { addItemToBasket, removeItemFromBasket, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
// {"user":27,"items":[{"quantity":1,"product":{"id":6,"category_name":"GENESIS","image1":"https://koreacenter.kg/media/cards/blue-print.jpg_eeejang.webp","image2":"https://koreacenter.kg/media/cards/lynxauto-BD-3623-yePxFM5.jpg.webp","image3":"https://koreacenter.kg/media/cards/mintex-MDB3267-mNjkKJx.jpeg.webp","image4":"https://koreacenter.kg/media/cards/sangsin-hi-q-SP1876-anshDsU.jpeg.webp","title":"тормозные","price":2500,"description":"тормозные колодки для Genesis G70","artikul":"42126","year":2024,"in_stock":true,"model":"G70 09.2017-н.в. 2.0 T-GDi 252 л.с","spare_part_number":"5050063078312","generation":"2024","choice":"Новый","created_at":"2024-10-24T07:01:07.429388Z","marka":"Genesis","category":1}},null,null],"created_at":"2024-11-28T06:28:29.689633Z","updated_at":"2024-11-28T06:28:29.689655Z","total_price":"2500.00","total_item_count":1}




// {"user":27,"items":[{"quantity":1,"product":{"id":10,"category_name":"audi","image1":"https://koreacenter.kg/media/cards/az_3Y2zM9e.jpg","image2":"https://koreacenter.kg/media/cards/66503975b72a4_K4559Rx.png","image3":"https://koreacenter.kg/media/cards/1667260944_zdgq2vspxojtoipy6bt-wws800_zAJQRYB.jpeg","image4":"https://koreacenter.kg/media/cards/kak_vybrat_zapchasti_dlya_inomarki_hezj8rmg88_6eIPVzo.jpg","title":"Chevrolet","price":2349,"description":"wdfghjkmhngfd  dfghjgfdsa fghjhgfd","artikul":"654354","year":1234,"in_stock":false,"model":"Sanota","spare_part_number":"234564","generation":"7","choice":"Б/У","created_at":"2024-11-08T10:30:40.741454Z","marka":"hundai","category":3}},{"quantity":2,"product":{"id":6,"category_name":"GENESIS","image1":"https://koreacenter.kg/media/cards/blue-print.jpg_eeejang.webp","image2":"https://koreacenter.kg/media/cards/lynxauto-BD-3623-yePxFM5.jpg.webp","image3":"https://koreacenter.kg/media/cards/mintex-MDB3267-mNjkKJx.jpeg.webp","image4":"https://koreacenter.kg/media/cards/sangsin-hi-q-SP1876-anshDsU.jpeg.webp","title":"тормозные","price":2500,"description":"тормозные колодки для Genesis G70","artikul":"42126","year":2024,"in_stock":true,"model":"G70 09.2017-н.в. 2.0 T-GDi 252 л.с","spare_part_number":"5050063078312","generation":"2024","choice":"Новый","created_at":"2024-10-24T07:01:07.429388Z","marka":"Genesis","category":1}}],"created_at":"2024-11-28T06:28:29.689633Z","updated_at":"2024-11-28T06:28:29.689655Z","total_price":"7349.00","total_item_count":3}
