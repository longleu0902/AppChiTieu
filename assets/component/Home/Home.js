import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Tab, Text, TabView } from '@rneui/themed';
import React, { useState } from 'react';
import Proceeds from './Proceeds';
import MoneySpent from './MoneySpent';


import { Button } from '@rneui/themed';
const Home = () => {
    const [index, setIndex] = useState(0);
    // console.log(">>check index", index)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Tab value={index} onChange={setIndex} >
                        <Tab.Item >
                            Tiền chi
                        </Tab.Item>
                        <Tab.Item>
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
        backgroundColor: '#FFF0F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    body: {
        backgroundColor: '#Fff',
        flex: 8
    }

});
export default Home;