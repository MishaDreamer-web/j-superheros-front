import { configureStore } from '@reduxjs/toolkit';
import superheroSlice from './features/superhero/superheroSlice';

export const store = configureStore({
  reducer: {
    superhero: superheroSlice,
  },
});
