import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart: []
}
export const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const CartActions = slice.actions
export const CartReduser = slice.reducer
