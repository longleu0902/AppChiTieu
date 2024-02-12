import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './userListReducer';

const store = configureStore({
    reducer:{
     user : userListReducer
    }
    
})

export default store;
