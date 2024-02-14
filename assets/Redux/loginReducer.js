import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   payload:{
    username : '',
    token: 'fake token',
    isAuthentication : false
   }
}

 const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.payload = action.payload
        },
    }
})
export const {setLogin } = LoginSlice.actions
export default LoginSlice.reducer