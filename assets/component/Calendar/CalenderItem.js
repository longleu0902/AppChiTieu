import React from 'react'
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
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory, fetchDelete } from "../../service/userService";



const CalenderItem = (props) => {
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorText = useSelector(state => state.themeColor.colorText);

    const slideAnim = useRef(new Animated.Value(0)).current;
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const handlePress = () => {
        if (showDeleteButton === false) {
            setShowDeleteButton(true);
            Animated.timing(slideAnim, {
                toValue: -70, // Di chuyển sang trái 100 đơn vị
                duration: 300,
                useNativeDriver: false,
            }).start();
            return
        }
        setShowDeleteButton(false);
        Animated.timing(slideAnim, {
            toValue: 0, // Reset vị trí
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleDelete = async (id) => {
        // console.log('check', id)
        const res = await fetchDelete(id)
        if (res && res.data.EC === 0) {
            props.renderComponent();
            Animated.timing(slideAnim, {
                toValue: 0, // Reset vị trí
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback key={props.index} onPress={handlePress}>
                    <Animated.View style={[styles.item, { transform: [{ translateX: slideAnim }] }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.boxDate, { backgroundColor: themeBackGround }]}>
                                <Text style={{ fontSize: 10, paddingBottom: 5, fontWeight: 700, color: themeColorText }}>{props.item.day}</Text>
                                <Text style={{ fontSize: 12, color: themeColorText }}>{props.item.time}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: 500, paddingBottom: 10 }}>{props.item.category}</Text>
                                <Text style={{ fontSize: 12 }}>{props.item.note ? props.item.note : 'Không có ghi chú'}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: props.item.type == 'moneySpent' ? '#DC143C' : '#50C7C7', paddingBottom: 10 }}>
                                    {props.item.type == 'moneySpent' ? `-${props.item?.price}` : `+${props.item?.price}`} VND
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 12 }}>{props.item.clock}</Text>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                {showDeleteButton && (
                    <Animated.View style={[styles.deleteButton, { transform: [{ translateX: slideAnim }] }]}>
                        <TouchableOpacity onPress={() => handleDelete(props.item._id)} style={styles.deleteButtonText}>
                            <Text style={styles.deleteButtonText}>Xóa</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}


            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // marginHorizontal: 20,
        // marginTop: 20,
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
        width: '96%',


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
    },

    deleteButton: {
        height: 75,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
})


export default CalenderItem
