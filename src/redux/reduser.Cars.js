import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cars: []
}
export const slice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.cars = action.payload
        }
    }
})

export const CarActions = slice.actions
export const CarReduser = slice.reducer
