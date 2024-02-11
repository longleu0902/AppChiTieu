import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Button } from 'react-native'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Tab } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faCalendar, faChartPie, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';



const Nav = () => {
    const [index, setIndex] = useState(0);

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
                <Tab style={style.Tab}
                    value={index}
                    onChange={(e) => setIndex(e)}

                >
                    <Tab.Item
                        style={style.tabItem}
                    >
                        <FontAwesomeIcon
                            color={index === 0 ? '#C71585' : ""}
                            icon={faHouse}
                        />
                        <Text
                            style={[style.Text, index === 0 && style.activeText]}
                        >
                            Trang chủ</Text>


                    </Tab.Item >
                    <Tab.Item
                        style={style.tabItem}
                    >

                        <FontAwesomeIcon
                            color={index === 1 ? '#C71585' : ""}
                            icon={faCalendar} />
                        <Text
                            style={[style.Text, index === 1 && style.activeText]}
                        >Lịch</Text>
                    </Tab.Item>
                    <Tab.Item

                        style={style.tabItem}>
                        <FontAwesomeIcon
                            color={index === 2 ? '#C71585' : ""}
                            icon={faChartPie} />
                        <Text
                            style={[style.Text, index === 2 && style.activeText]}
                        >Báo cáo</Text>
                    </Tab.Item>
                    <Tab.Item
                        style={style.tabItem}>
                        <FontAwesomeIcon
                            color={index === 3 ? '#C71585' : ""}
                            icon={faGear} />
                        <Text
                            style={[style.Text, index === 3 && style.activeText]}
                        >
                            Cài Đặt</Text>
                    </Tab.Item>
                </Tab>
            </SafeAreaView>
            {/* <Button
                title="Go to About"
                onPress={() => navigation.navigate('Setting')}
            />
              <Button
                title="Go to home"
                onPress={() => navigation.navigate('Home')}
            />
              <Button
                title="Go to cadenler"
                onPress={() => navigation.navigate('Calender')}
            />
                <Button
                title="Go to Statistics"
                onPress={() => navigation.navigate('Statistics')}
            /> */}
        </>
    )
}
const style = StyleSheet.create({
    Tab: {
        height: 90,
        paddingBottom: 30,
        backgroundColor: "#FFF0F5",
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
    activeText: {
        color: "#C71585"
    }
})

export default Nav;