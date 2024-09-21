import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categoryProduct/categorySlice";
import ProductSlice from "./productSlice/ProductSlice"
import userSlice from "./userSlice/userSlice";
const store = configureStore({
  reducer: {
    products: ProductSlice,
    categories: categorySlice,
    user: userSlice
  },
});
export default store;
