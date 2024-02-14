import Nav from "../component/Nav/Nav"
import AppRouter from "../Router/AppRouter"
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import Login from "../component/Login/Login";


const LayOut = () => {
    const auth = useSelector(state => state.login.payload)
    console.log(auth)
    if(auth.isAuthentication == true) {
        return (
            <>
             <AppRouter />
                <Nav />
            </>
        )
    }else{
        return (
            <>
            <Login/>
            </>
        )
    }
 

}
export default LayOut;