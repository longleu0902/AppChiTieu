import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Tab, Text, TabView } from '@rneui/themed';
import React, { useState } from 'react';
import Proceeds from './Proceeds';
import MoneySpent from './MoneySpent';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandHoldingHand, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@rneui/themed';
const Home = () => {
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);

    const [index, setIndex] = useState(0);
    // console.log(">>check index", index)
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: themeBackGround }]}>
                    <Tab value={index} onChange={setIndex} indicatorStyle={{ backgroundColor: themeColorActive }} >
                        <Tab.Item titleStyle={{ color: themeColorText }} >
                            <View style={{flexDirection:'row',gap:10}}>
                                <FontAwesomeIcon icon={faHandHoldingDollar} style={[styles.Text, { color: themeColorText }, index === 0 && { color: themeColorActive },]} />
                            <Text
                                style={[styles.Text, { color: themeColorText }, index === 0 && { color: themeColorActive },]}
                            >Chi tiêu
                            </Text>
                            </View>
                       
                        </Tab.Item>
                        <Tab.Item titleStyle={{ color: themeColorText }}>
                        <View style={{flexDirection:'row',gap:10}}>
                                <FontAwesomeIcon icon={faHandHoldingHand} style={[styles.Text, { color: themeColorText }, index === 1 && { color: themeColorActive },]} />
                            <Text
                                style={[styles.Text, { color: themeColorText }, index === 1 && { color: themeColorActive },]}
                            >Thu nhập
                            </Text>
                            </View>
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
    },
    Text: {
        fontSize:15,
        marginBottom:10
    }

});
export default Home;