import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    listHistory:[]
}

 const userListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        listHistory: (state, action) => {
            state.listHistory.unshift(action.payload)
        },
    }
})
export const {listHistory } = userListSlice.actions
export default userListSlice.reducer