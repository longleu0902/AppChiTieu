import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './userListReducer';
import themeColorReducer from './themeColorReducer';
import loginReducer from './loginReducer';

const store = configureStore({
    reducer:{
     user : userListReducer ,
     themeColor : themeColorReducer,
     login : loginReducer
    }
    
})

export default store;
