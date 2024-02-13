import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './userListReducer';
import themeColorReducer from './themeColorReducer';

const store = configureStore({
    reducer:{
     user : userListReducer ,
     themeColor : themeColorReducer,
    }
    
})

export default store;
