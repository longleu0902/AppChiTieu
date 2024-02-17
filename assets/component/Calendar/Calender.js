
import { useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Dimensions,
    Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { listHistory } from '../../Redux/userListReducer';
import { fetchHistory,fetchDelete } from "../../service/userService";
import CalenderItem from './CalenderItem';
import { Toast } from 'toastify-react-native';




const Calender = () => {
    const userName = useSelector(state => state.login.payload.username);
    const dispatch = useDispatch();

    const getListUser = async () => {
        let pushHistory = await fetchHistory(userName);
        if (pushHistory.data.EC === 0) {
            dispatch(listHistory(pushHistory.data.DT))
        }
    }
    useEffect(() => {
        getListUser();
    }, [])

    const windowHeight = Dimensions.get('window').height;
    const list = useSelector(state => state.user.listHistory);
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);





    const [history, setHistory] = useState([]);
    const buildHistory = () => {
        // // Sắp xếp mảng theo key thời gian
        // const _list = [...list]
        // let mergedArray = _list.sort((a, b) => {
        //     const timeA = a.clock.split(":").map(Number);
        //     const timeB = b.clock.split(":").map(Number);
        //     // So sánh giờ và phút của hai đối tượng
        //     if (timeA[0] !== timeB[0]) {
        //         return timeB[0] - timeA[0]; // Sắp xếp giảm dần theo giờ
        //     } else if (timeB[1] !== timeA[1]) {
        //         return timeB[1] - timeA[1]; // Sắp xếp giảm dần theo phút
        //     } else {
        //         return timeB[2] - timeA[2]; // Sắp xếp giảm dần theo giây
        //     }
        // });
        const _list = [...list]
        let mergedArray = _list.reverse();
        setHistory(mergedArray)
        priceTotal(mergedArray)
    }



    const [checkTotal, setCheckTotal] = useState(0);
    const [totalMoneySpent, setTotalMoneySpent] = useState(0);
    const [totalProceeds, setTotalProceeds] = useState(0);

    const priceTotal = (list) => {
        const moneySpent = list.filter((item) => item.type == "moneySpent");
        const proceeds = list.filter((item) => item.type == "proceeds")
        let totalMoneySpent = moneySpent.reduce((a, b) => {
            let priceWithoutComma = b.price.replace(/,/g, '');
            return Number(a) + Number(priceWithoutComma)
        }, 0)
        setTotalMoneySpent(totalMoneySpent)
        let totalProceeds = proceeds.reduce((a, b) => {
            let priceWithoutComma = b.price.replace(/,/g, '');
            return Number(a) + Number(priceWithoutComma)
        }, 0)
        setTotalProceeds(totalProceeds)

        let checkTotal = totalProceeds - totalMoneySpent;
        setCheckTotal(checkTotal)
    }
    useEffect(() => {
        buildHistory();
    }, [list])

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

   const renderComponent = () => {
    getListUser();
    buildHistory();

   }
 

    return (
        <>
            <View style={[styles.container, { height: windowHeight }, { backgroundColor: themeBackGround }]}>
                <View style={[styles.header, { backgroundColor: themeBackGround }]}>
                    <Text style={[styles.textHeader, { color: themeColorText }]}>Lịch sử</Text>
                </View>
                <View style={[styles.body, { backgroundColor: themeBackGround }]}>
                    <View style={styles.bodyHeader}>
                        <View style={styles.bodyHeaderItem}>
                            <Text style={{ fontSize: 12, paddingBottom: 4 }}>Thu nhập</Text>
                            <Text style={{ color: '#50C7C7', fontSize: 18 }}>{numberWithCommas(totalProceeds)}đ</Text>
                        </View>
                        <View style={styles.bodyHeaderItem}>
                            <Text style={{ fontSize: 12, paddingBottom: 4 }}>Chi tiêu</Text>
                            <Text style={{ color: '#DC143C', fontSize: 18 }}>{numberWithCommas(totalMoneySpent)}đ</Text>
                        </View>
                        <View style={styles.bodyHeaderItem}>
                            <Text style={{ fontSize: 12, paddingBottom: 4 }}>Tổng</Text>
                            <Text style={{ color: checkTotal < 0 ? '#DC143C' : '#50C7C7', fontSize: 18 }} >{numberWithCommas(checkTotal)} </Text>
                        </View>
                    </View>
                    <ScrollView style={styles.bodyItem} >
                        {history && history.length > 0 &&
                            history.map((item, index) => {
                                return (
                                    <CalenderItem index={index} item={item} renderComponent={renderComponent} />                                  
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#FFF0F5',
    },
    header: {
        height: 100,
        // backgroundColor: '#FFF0F5',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textHeader: {
        paddingVertical: 15,
        fontSize: 18,
    },
    body: {
        // backgroundColor: '#FFF0F5',
    },
    bodyHeader: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 8,
        borderRadius: 10,
    },
    bodyHeaderItem: {
        alignItems: 'center'
    },
    bodyItem: {
        marginVertical: 10,

    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginVertical: 3,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,


    },
    boxDate: {
        width: 80,
        height: 50,
        // backgroundColor: '#FFF0F5',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginRight: 15
    }
})
export default Calender;