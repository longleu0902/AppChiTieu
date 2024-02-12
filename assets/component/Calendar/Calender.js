
import { useState, useEffect } from 'react';
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
    Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';


const Calender = () => {
    const windowHeight = Dimensions.get('window').height;
    const moneySpent = useSelector(state => state.user.moneySpent);
    const proceeds = useSelector(state => state.user.proceeds);

    const [history, setHistory] = useState([]);

    // console.log("check store moneySpent", moneySpent)
    // console.log("check store proceeds", proceeds)
    const buildHistory = () => {
        //Gộp hai mảng thành một mảng duy nhất
        const mergedArray = moneySpent.concat(proceeds);
        // Sắp xếp mảng theo key thời gian
        mergedArray.sort((a, b) => {
            const timeA = a.clock.split(":").map(Number);
            const timeB = b.clock.split(":").map(Number);
            // So sánh giờ và phút của hai đối tượng
            if (timeA[0] !== timeB[0]) {
                return timeB[0] - timeA[0]; // Sắp xếp giảm dần theo giờ
            } else if (timeB[1] !== timeA[1]) {
                return timeB[1] - timeA[1]; // Sắp xếp giảm dần theo phút
            } else {
                return timeB[2] - timeA[2]; // Sắp xếp giảm dần theo giây
            }
        });
        setHistory(mergedArray)
    }



    const [checkTotal, setCheckTotal] = useState(0);
    const [totalMoneySpent, setTotalMoneySpent] = useState(0);
    const [totalProceeds, setTotalProceeds] = useState(0);

    const priceTotal = () => {
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
        priceTotal();
        buildHistory();
    }, [moneySpent, proceeds])

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <View style={[styles.container, { height: windowHeight }]}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Lịch sử</Text>
                </View>
                <View style={styles.body}>
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
                                    <View key={index} style={styles.item}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.boxDate}>
                                                <Text style={{ fontSize: 10, paddingBottom: 5, fontWeight: 700 }}>{item.day}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.time}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 14, fontWeight: 500, paddingBottom: 10 }}>{item.category}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.note ? item.note : 'Không có ghi chú'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', alignContent: 'flex-end' }}>
                                            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                            <Text style={{ color: item.type == 'moneySpent' ? '#DC143C' : '#50C7C7', paddingBottom: 10 }}>
                                                {item.type == 'moneySpent' ? `-${item.price}` : `+${item.price}`} VND
                                            </Text>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                            <Text style={{ fontSize: 12 }}>{item.clock}</Text>
                                            </View>
                                        </View>
                                    </View>
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
        backgroundColor: '#FFF0F5',
    },
    header: {
        height: 100,
        backgroundColor: '#FFF0F5',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textHeader: {
        paddingVertical: 15,
        fontSize: 18,
    },
    body: {
        backgroundColor: '#FFF0F5',
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
        marginVertical: 7,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 10,


    },
    boxDate: {
        width: 80,
        height: 50,
        backgroundColor: '#FFF0F5',
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