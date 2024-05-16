import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CarProps } from '@/lib/models/Cars';

interface OrderSliceState {
  items: CarProps[];
}

const initialState: OrderSliceState = {
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CarProps>) {
      state.items = [{ ...action.payload }];
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj._id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = orderSlice.actions;
export default orderSlice.reducer;
