import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Button } from 'react-native'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Tab } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faCalendar, faChartPie, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';



const Nav = () => {
    const [index, setIndex] = useState(0);
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state=> state.themeColor.colorActive);
    const themeColorText = useSelector(state=> state.themeColor.colorText);

    const navigation = useNavigation();
    // console.log(selectedIndex)
    // console.log("check index", index)

    useEffect(() => {
        switch (index) {
            case 0:
                navigation.navigate('Home')
                break;
            case 1:
                navigation.navigate('Calender')
                break;
            case 2:
                navigation.navigate('Statistics')
                break;
            case 3:
                navigation.navigate('Setting')
                break;
            default:
                console.log(`Sorry, we are out of ${index}.`);
        }
    }, [index])

    return (
        <>
            <SafeAreaView>
                <Tab style={[style.Tab, {backgroundColor : themeBackGround}]}
                    value={index}
                    onChange={(e) => setIndex(e)}
                    disableIndicator
                >
                    <Tab.Item
                        style={style.tabItem}
                    >
                        <FontAwesomeIcon
                            color={index === 0 ? themeColorActive : themeColorText}
                            icon={faHouse}
                        />
                        <Text
                            style={[style.Text,{color:themeColorText}, index === 0 && {color : themeColorActive},]}
                        >
                            Nhập vào</Text>


                    </Tab.Item >
                    <Tab.Item
                        style={style.tabItem}
                    >

                        <FontAwesomeIcon
                            color={index === 1 ? themeColorActive : themeColorText}
                            icon={faCalendar} />
                        <Text
                            style={[style.Text, {color:themeColorText},index === 1 && {color : themeColorActive}]}
                        >Lịch sử</Text>
                    </Tab.Item>
                    <Tab.Item

                        style={style.tabItem}>
                        <FontAwesomeIcon
                            color={index === 2 ? themeColorActive : themeColorText}
                            icon={faChartPie} />
                        <Text
                            style={[style.Text,{color:themeColorText}, index === 2 && {color : themeColorActive}]}
                        >Báo cáo</Text>
                    </Tab.Item>
                    <Tab.Item
                        style={style.tabItem}>
                        <FontAwesomeIcon
                            color={index === 3 ? themeColorActive : themeColorText}
                            icon={faGear} />
                        <Text
                            style={[style.Text ,{color:themeColorText}, index === 3 && {color : themeColorActive}]}
                        >
                            Cài Đặt</Text>
                    </Tab.Item>
                </Tab>
            </SafeAreaView>
        </>
    )
}
const style = StyleSheet.create({
    Tab: {
        height: 90,
        paddingBottom: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    Text: {
        // paddingHorizontal: 10,
        paddingVertical: 10,
        color: "#000"
    },
})

export default Nav;