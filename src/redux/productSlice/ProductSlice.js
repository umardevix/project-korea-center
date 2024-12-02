import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('Token is missing');
  }
  return token;
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products/product/');
  return response.data;
});


// Асинхронный thunk для удаления продукта
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`/products/product/${productId}`);
  return productId;
});


// Асинхронный thunk для добавления продукта
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post('/products/product/', newProduct);
      return response.data; // Возвращаем добавленный продукт
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else {
        console.error("Error Message:", error.message);
      }
      return rejectWithValue(error.response?.data || "Ошибка запроса");
    }
  }
);


export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async ({ productData }) => {
    const response = await axios.post("https://koreacenter.kg/api/basket/", productData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
    
  }
);

export const deleteBasketItem = createAsyncThunk(
  'basket/deleteItem',
  async (productId, { rejectWithValue }) => {
    const token = getAccessToken(); // Get token from localStorage
    if (!token) {
      return rejectWithValue({ error: "Token is missing" });
    }

    try {
      const response = await axios.delete(`https://koreacenter.kg/api/basket/item/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      return console.log(productId);

      ; // Return only productId
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "An error occurred" });
    }
  }
);



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
  basket: {
    items: [],
    total_items_count: 0,
  },
  token: null,
  basketItems: [],
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
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload; // Установите токен при аутентификации
    },
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
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.basket.items.push(action.payload.item); // добавляем добавленный товар
        state.basket.total_items_count = action.payload.total_items_count; // обновляем общее количество
      })


      .addCase(addToBasket.rejected, (state, action) => {
        console.error("Ошибка добавления в корзину:", action.error);
        state.loading = false; // Завершение загрузки при ошибке
      })
      .addCase(deleteBasketItem.fulfilled, (state, action) => {
        // Логика для обновления состояния после успешного удаления
        state.basket = state.basket.filter(item => item.product !== action.payload); // Удаление по productId
      })
      .addCase(deleteBasketItem.rejected, (state, action) => {
        // Логика для обработки ошибки
        console.error(action.payload);
      });

  },
});

export const {
  updateBasketCount,
  setSearchQuery,
  setProductCondition,
  setSelectedMarka,
  setSelectedModel,
  setSelectedGeneration,
  setSelectedArticul,
  setSelectedCategories,
  filterProducts,
  setBasket,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
// https://latest.currency-api.pages.dev/v1/currencies/kgs.json net::ERR_CONNECTION_CLOSED