import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    moneySpent: [],
    proceeds: []
}

 const userListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        proceedsChange: (state, action) => {
            state.proceeds.unshift(action.payload)
        },
        moneySpent: (state, action) => {
            state.moneySpent.unshift(action.payload)
        }
    }
})
export const {proceedsChange , moneySpent  } = userListSlice.actions
export default userListSlice.reducer