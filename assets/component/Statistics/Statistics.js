import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Annually from './annually';
import Monthly from './monthly';
import { listHistory } from '../../Redux/userListReducer';
import { fetchHistory, fetchDelete } from "../../service/userService";
import { useNavigation } from '@react-navigation/native';







const Statistics = () => {
    const userName = useSelector(state => state.login.payload.username);
    const dispatch = useDispatch();

    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);


    const [valueInput, setValueInput] = useState(0);

    const getListUser = async () => {
        let pushHistory = await fetchHistory(userName);
        if (pushHistory.data.EC === 0) {
            dispatch(listHistory(pushHistory.data.DT))
        }
    }
    useEffect(()=> {
        getListUser()
    })

    const changeInput = (value) => {
        if (value === 0) {
            setValueInput(0)
            return;
        }
        setValueInput(1)
    }
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: themeBackGround }]}>
                    <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#fff', borderRadius: 7 }}>
                        <TouchableOpacity onPress={() => changeInput(0)} style={[styles.btnHeader, { backgroundColor: valueInput === 0 ? themeColorActive : "#fff" }]}>
                            <Text style={{ color: valueInput === 0 ? "#fff":'#383838' }}>Hàng tháng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeInput(1)} style={[styles.btnHeader, { backgroundColor: valueInput === 1 ? themeColorActive : "#fff" }]}>
                            <Text style={{ color: valueInput === 1 ? "#fff": '#383838' }}>Hàng Năm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    {valueInput == 0 ? <Monthly/> : <Annually/> }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    body: {
        flex: 8,
        marginVertical:20,
        marginHorizontal:20


    },
    btnHeader: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 7


    }
})
export default Statistics;