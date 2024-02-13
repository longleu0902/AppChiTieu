import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCalendar,
    faComment,
    faDollarSign,
    faUtensils,
    faCar,
    faBagShopping,
    faMoneyBill,
    faShirt,
    faRotateLeft,
    faBeerMugEmpty,
    faBars,
    faPersonDress
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import ToastManager, { Toast } from 'toastify-react-native';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { listHistory } from '../../Redux/userListReducer'



const MoneySpent = () => {
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state=> state.themeColor.colorActive);
    const themeColorText = useSelector(state=> state.themeColor.colorText);


    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const defaultList = [
        {
            id: 1,
            title: 'Ăn uống',
            icon: faUtensils,
            colorIcon: '#FFD700',
            active: false,
        },
        {
            id: 2,
            title: 'Đi lại',
            icon: faCar,
            colorIcon: 'green',
            active: false,
        },
        {
            id: 3,
            title: 'Chi tiêu',
            icon: faBagShopping,
            colorIcon: '#FF0000',
            active: false,
        },
        {
            id: 4,
            title: 'Hóa đơn',
            icon: faMoneyBill,
            colorIcon: '#7FFFD4',
            active: false,
        },
        {
            id: 5,
            title: 'Quần áo',
            icon: faShirt,
            colorIcon: '#FFA07A',
            active: false,
        },
        {
            id: 6,
            title: 'Mỹ phẩm',
            icon: faPersonDress,
            colorIcon: '#B150C7',
            active: false,
        },
        {
            id: 7,
            title: 'Đáo thẻ',
            icon: faRotateLeft,
            colorIcon: '#7D657D',
            active: false,
        },
        {
            id: 8,
            title: 'Liên hoan',
            icon: faBeerMugEmpty,
            colorIcon: '#DAA520',
            active: false,
        },
        {
            id: 9,
            title: 'Khác',
            icon: faBars,
            colorIcon: '#000000',
            active: false,
        },

    ]
    const [renderList, setRenderList] = useState(defaultList);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [day, setDay] = useState('');


    const updateTime = (time) => {
        const dayOfWeek = time.day();
        let dayOfWeekString;
        switch (dayOfWeek) {
            case 0:
                dayOfWeekString = 'Chủ nhật';
                break;
            case 1:
                dayOfWeekString = 'Thứ hai';
                break;
            case 2:
                dayOfWeekString = 'Thứ ba';
                break;
            case 3:
                dayOfWeekString = 'Thứ tư';
                break;
            case 4:
                dayOfWeekString = 'Thứ năm';
                break;
            case 5:
                dayOfWeekString = 'Thứ sáu';
                break;
            case 6:
                dayOfWeekString = 'Thứ bảy';
                break;
            default:
                dayOfWeekString = '';
        }
        return dayOfWeekString;
    }
    useEffect(()=> {
        let _day = updateTime(currentDate);
        setDay(_day)
    },[])

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('thay doi gio')
            let _day;
            const now = dayjs();
            if (now.date() !== currentDate.date() && now.day() !== currentDate.day()) {
                setCurrentDate(now);
                _day = updateTime(now);
                setDay(_day)
            }
        }, 10 * 60 * 1000);

        return () => clearInterval(timer);
    }, [currentDate]);


    const formatNumber = (text) => {
        const cleanText = text.replace(/\D/g, '');
        const formattedText = cleanText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setPrice(formattedText);
    };



    const handleChangeList = (id) => {
        const resetRenderList = renderList.forEach(item => item.active = false)
        setRenderList(resetRenderList)
        let _renderList = [...renderList]
        const index = _renderList.findIndex(item => item.id === id)
        if (index !== -1) {
            _renderList[index]['active'] = true
            setRenderList(_renderList)
            // console.log(renderList)

        }
    }
    const handleClick = () => {
        const category = renderList.find(item => item.active == true)
        const clock = dayjs();
        if (price && price.length > 0) {
            const arr = {
                day : day ,
                time: currentDate.format('DD-MM-YYYY'),
                clock : clock.format("HH:mm:ss"),
                price: price,
                note: note,
                category: category ? category.title : 'Khác',
                type : 'moneySpent',
            }
            dispatch(listHistory(arr))
            setPrice('');
            setNote('');
            Toast.success('Nhập thành công', 'top' )
        } else {
            Toast.error("Đéo tiền nhập à", 'top')
        }
    }
    const handlePressScreen = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi chạm vào màn hình
    };
    return (
        <TouchableWithoutFeedback onPress={handlePressScreen}>
            <View style={styles.container} >
                <ToastManager textStyle={{fontSize:14}} width={300} height={50} positionValue={-80} />
                <View style={styles.Input}>
                    <FontAwesomeIcon style={styles.icon} icon={faCalendar} />
                    <TextInput style={{ width: '100%', color: '#ccc' }}
                        value={`${day}-${currentDate.format('DD-MM-YYYY')}`}
                        editable={false}
                    />

                </View>
                <View style={styles.Input}>
                    <FontAwesomeIcon style={styles.icon} icon={faMoneyBill} />
                    <TextInput style={{ width: '100%' }}
                        placeholder='Tiền chi'
                        keyboardType="numeric"
                        onChangeText={formatNumber}
                        value={price}
                    />
                </View>
                <View style={styles.Input}>
                    <FontAwesomeIcon style={styles.icon} icon={faComment} />
                    <TextInput style={{ width: '100%' }}
                        placeholder='Ghi chú'
                        onChangeText={(text) => setNote(text)}
                        maxLength={25}
                        value={note}
                    />
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ marginVertical: 30, fontSize: 15, fontWeight: 600 }}>Danh mục</Text>
                    <View style={styles.listItem}>
                        {renderList.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => handleChangeList(item.id)} key={index} 
                                // style={item.active === false ? styles.boxList : styles.boxListActive}
                                style={[
                                    styles.boxList,
                                    item.active === false ? null : styles.boxListActive,
                                    { borderColor: item.active === false ? themeBackGround : themeColorActive }
                                  ]}
                                >
                                    <FontAwesomeIcon style={{ color: `${item.colorIcon}` }} icon={item.icon} fade />
                                    <Text style={{ paddingVertical: 4 }}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })}


                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Button
                        onPress={handleClick}
                        style={{ marginTop: 15 }}
                        buttonStyle={{ backgroundColor:themeBackGround, borderRadius: 10 }}
                        titleStyle={{ color: themeColorText }}
                        icon={{
                            name: 'arrow-right',
                            type: 'font-awesome',
                            size: 15,
                            color: themeColorText,
                        }}

                        iconRight
                        iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    >Nhập khoản chi</Button>
                </View>



            </View>
        </TouchableWithoutFeedback>

    )
}
export default MoneySpent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 20
    },
    Input: {
        flexDirection: "row",
        height: 60,
        borderColor: 'gray',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        alignItems: 'center',
        width: '100%'
    },
    icon: {
        marginRight: 20
    },
    listItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    boxList: {
        width: 110,
        height: 60,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center'

    },
    boxListActive: {
        width: 110,
        height: 60,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 3,
        borderColor: "#000",
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },


})
