import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    users: []
}
export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.users = action.payload
        }
    }
})

export const UserActions = slice.actions
export const UserReduser = slice.reducer
