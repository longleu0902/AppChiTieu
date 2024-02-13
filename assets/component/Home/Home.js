import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Tab, Text, TabView } from '@rneui/themed';
import React, { useState } from 'react';
import Proceeds from './Proceeds';
import MoneySpent from './MoneySpent';
import { useSelector } from 'react-redux';


import { Button } from '@rneui/themed';
const Home = () => {
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state=> state.themeColor.colorActive);
    const themeColorText = useSelector(state=> state.themeColor.colorText);

    const [index, setIndex] = useState(0);
    // console.log(">>check index", index)
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.header,{backgroundColor: themeBackGround}]}>
                    <Tab value={index} onChange={setIndex} indicatorStyle={{backgroundColor:themeColorActive}} >
                        <Tab.Item titleStyle={{color:themeColorText}} >
                            Tiền chi
                        </Tab.Item>
                        <Tab.Item titleStyle={{color:themeColorText}}>
                            Tiền thu
                        </Tab.Item>
                    </Tab>
                </View>
                <View style={styles.body}>
                    {index === 0 ? <MoneySpent /> : <Proceeds />}

                </View>

            </View  >
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    body: {
        backgroundColor: '#fff',
        flex: 8
    }

});
export default Home;