import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categoryProduct/categorySlice";
import ProductSlice from "./productSlice/ProductSlice"
import userSlice from "./userSlice/userSlice";
import basketReducer from "./basketSlice/basketSlice";
import totalSlice from "./totalSlice/totalSlice"
import popupSlice from "./popupSlice/popupSlice"
const store = configureStore({
  reducer: {
    products: ProductSlice,
    categories: categorySlice,
    user: userSlice,
    basket: basketReducer,
    total:totalSlice,
    popupSlice:popupSlice
  },
});
export default store;
