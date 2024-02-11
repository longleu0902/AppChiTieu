import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCalendar,
    faComment,
    faMoneyBill,
    faBars,
    faWallet,
    faPiggyBank,
    faGift,
    faSackDollar,
    faCoins,

} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import ToastManager, { Toast } from 'toastify-react-native';
import dayjs from 'dayjs';



const Proceeds = () => {
    const currentDate = dayjs().format('DD/MM/YYYY');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const navigation = useNavigation();
    const defaultList = [
        {
            id: 1,
            title: 'Tiền lương',
            icon: faWallet,
            colorIcon: '#7FFFD4',
            active: false,
        },
        {
            id: 2,
            title: 'Tiền phụ cấp',
            icon: faPiggyBank,
            colorIcon: '#F08080',
            active: false,
        },
        {
            id: 3,
            title: 'Tiền thưởng',
            icon: faGift,
            colorIcon: '#FF0000',
            active: false,
        },
        {
            id: 4,
            title: 'Thu nhập phụ',
            icon: faSackDollar,
            colorIcon: '#74C0FC',
            active: false,
        },
        {
            id: 5,
            title: 'Đầu tư',
            icon: faCoins,
            colorIcon: '#FFD700',
            active: false,
        },
        {
            id: 6,
            title: 'Khác',
            icon: faBars,
            colorIcon: '#000000',
            active: false,
        },
    ]
    const [renderList, setRenderList] = useState(defaultList)


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
        if (price && price.length > 0) {
            const arr = {
                time: currentDate,
                price: price,
                note: note,
                category: category ? category.title : 'Khác'
            }
            console.log(">>>chect arr", arr)
            Toast.success('Nhập thành công', 'top')
        } else {
            Toast.error("Điền đủ thông tin", 'top')
        }
    }
    const handlePressScreen = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi chạm vào màn hình
    };
    const formatNumber = (text) => {
        const cleanText = text.replace(/\D/g, '');
        const formattedText = cleanText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setPrice(formattedText);
      };
    return (
        <TouchableWithoutFeedback onPress={handlePressScreen}>
            <View style={styles.container} >
                <ToastManager />
                <View style={styles.Input}>
                    <FontAwesomeIcon style={styles.icon} icon={faCalendar} />
                    <TextInput style={{ width: '100%' , color:'#ccc' }}
                        value={currentDate}
                        editable={false}
                    />

                </View>
                <View style={styles.Input}>
                    <FontAwesomeIcon style={styles.icon} icon={faMoneyBill} />
                    <TextInput style={{ width: '100%' }}
                        placeholder='Tiền thu'
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
                    />
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ marginVertical: 30, fontSize: 15, fontWeight: 600 }}>Danh mục</Text>
                    <View style={styles.listItem}>
                        {renderList.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => handleChangeList(item.id)} key={index} style={item.active === false ? styles.boxList : styles.boxListActive}>
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
                        buttonStyle={{ backgroundColor: '#FFF0F5', borderRadius: 10 }}
                        titleStyle={{ color: '#000' }}
                        icon={{
                            name: 'arrow-right',
                            type: 'font-awesome',
                            size: 15,
                            color: '#000',
                        }}

                        iconRight
                        iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    >Nhập khoản thu</Button>
                </View>



            </View>
        </TouchableWithoutFeedback>

    )
}
export default Proceeds;

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
        borderWidth: 2,
        borderColor: "#000",
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },


})