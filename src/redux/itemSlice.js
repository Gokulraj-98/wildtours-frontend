import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        },
        updateCartItem: (state, action) => {
            const { itemId, guide } = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === itemId);
            if (itemIndex > -1) {
                state.cartItems[itemIndex].guide = guide;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateCartItem } = itemSlice.actions;

export default itemSlice.reducer;
