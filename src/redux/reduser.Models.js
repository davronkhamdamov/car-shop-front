import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    models: []
}
export const slice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.models = action.payload
        }
    }
})

export const ModelsActions = slice.actions
export const Modelreduser = slice.reducer
