import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: []
}
export const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.data = action.payload
        }
    }
})

export const Posts = slice.actions
export const reduser = slice.reducer
