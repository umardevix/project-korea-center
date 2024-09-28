import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products/product');
  return response.data;
});


// Асинхронный thunk для удаления продукта
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`/products/product/${productId}`);
  return productId;
});


// Асинхронный thunk для добавления продукта
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post('/products/product/', newProduct);
  return response.data; // Возвращаем добавленный продукт
});


export const fetchArticulData = (articul) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/products?articul=${articul}`);
      const data = await response.json();

      dispatch({
        type: 'FETCH_ARTICUL_RESULTS',
        payload: data,
      });
    } catch (error) {
      console.error('Ошибка при поиске артикула:', error);
    }
  };
};



const initialState = {
  products: [],
  filteredProducts: [],
  selectedMarka: '',
  selectedModel: '',
  selectedGeneration: '',
  selectedArticul: '',
  selectedCategories: '',
  loading: false,
  error: null,
};

const conditionMap = {
  'all': ['Новый', 'Б/У'],
  'new': ['Новый'],
  'used': ['Б/У'],
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload || ''; // Защита от undefined
      productsSlice.caseReducers.filterProducts(state); // Фильтрация при изменении
    },
    setProductCondition(state, action) {
      state.productCondition = action.payload || 'all'; // Защита от undefined
      productsSlice.caseReducers.filterProducts(state); // Фильтрация при изменении
    },
    setSelectedMarka(state, action) {
      state.selectedMarka = action.payload;
    },
    setSelectedModel(state, action) {
      state.selectedModel = action.payload;
    },
    setSelectedGeneration(state, action) {
      state.selectedGeneration = action.payload;
    },
    setSelectedArticul(state, action) {
      state.selectedArticul = action.payload;
    },
    filterProducts(state) {
      const lowerCaseQuery = (state.searchQuery || '').toLowerCase();  // Безопасный вызов toLowerCase
      const conditionList = conditionMap[state.productCondition] || [];

      state.filteredProducts = state.products.filter((product) => {
        if (!product || typeof product.title !== 'string') {
          return false;
        }

        const title = product.title.toLowerCase();
        const matchesSearch = title.includes(lowerCaseQuery);
        const matchesCondition = product.choice ? conditionList.includes(product.choice) : false;
        const matchCategories = state.selectedCategories ? product.category === state.selectedCategories : true;
        const matchesMarka = state.selectedMarka ? product.marka === state.selectedMarka : true;
        const matchesModel = state.selectedModel ? product.model === state.selectedModel : true;
        const matchesGeneration = state.selectedGeneration ? product.generation === state.selectedGeneration : true;
        const matchesArticul = state.selectedArticul ? product.articul === state.selectedArticul : true;

        return matchesSearch && matchesCondition && matchesMarka && matchesModel && matchesGeneration && matchesArticul && matchCategories;
      });
    },

    resetFilters(state) {
      state.selectedMarka = '';
      state.selectedModel = '';
      state.selectedGeneration = '';
      state.selectedArticul = '';
      state.filteredProducts = state.products;
      state.selectedCategories = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
        state.filteredProducts = state.filteredProducts.filter(product => product.id !== action.payload);
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Добавляем новый продукт
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSearchQuery,
  setProductCondition,
  setSelectedMarka,
  setSelectedModel,
  setSelectedGeneration,
  setSelectedArticul,
  setSelectedCategories,
  filterProducts,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;