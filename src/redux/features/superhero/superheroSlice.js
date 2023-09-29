import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  superheros: [],
  loading: false,
};

export const createSuperhero = createAsyncThunk(
  'superhero/createSuperhero',
  async params => {
    try {
      const { data } = await axios.post('/superheros', params);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getAllSuperheros = createAsyncThunk(
  'superhero/getAllSuperheros',
  async () => {
    try {
      const { data } = await axios.get('/superheros');
      const superheros = data.data.superheros;
      return superheros;
    } catch (error) {
      console.log(error);
    }
  },
);

export const removeSuperhero = createAsyncThunk(
  'superhero/removeSuperhero',
  async id => {
    try {
      const { data } = await axios.delete(`/superheros/${id}`, id);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateSuperhero = createAsyncThunk(
  'superhero/updateSuperhero',
  async dataSuperhero => {
    try {
      const { data } = await axios.put(
        `/superheros/${dataSuperhero.id}`,
        dataSuperhero,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const superheroSlice = createSlice({
  name: 'superhero',
  initialState,
  reducers: {},
  extraReducers: {
    //   Create superhero
    [createSuperhero.pending]: state => {
      state.loading = true;
    },
    [createSuperhero.fulfilled]: (state, action) => {
      state.loading = false;
      state.superheros.push(action.payload);
    },
    [createSuperhero.rejected]: state => {
      state.loading = false;
    },
    //   Get all superheros
    [getAllSuperheros.pending]: state => {
      state.loading = true;
    },
    [getAllSuperheros.fulfilled]: (state, action) => {
      state.loading = false;
      state.superheros = action.payload;
    },
    [getAllSuperheros.rejected]: state => {
      state.loading = false;
    },
    //   Remove superhero
    [removeSuperhero.pending]: state => {
      state.loading = true;
    },
    [removeSuperhero.fulfilled]: (state, action) => {
      state.loading = false;
      state.superheros = state.superheros.filter(
        superhero => superhero.id !== action.payload.id,
      );
    },
    [removeSuperhero.rejected]: state => {
      state.loading = false;
    },
    //   Update superhero
    [updateSuperhero.pending]: state => {
      state.loading = true;
    },
    [updateSuperhero.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.superheros.findIndex(
        superhero => superhero.id === action.payload.id,
      );
      state.superheros[index] = action.payload;
    },
    [updateSuperhero.rejected]: state => {
      state.loading = false;
    },
  },
});

export default superheroSlice.reducer;
