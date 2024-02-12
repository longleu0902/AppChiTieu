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


const Setting = () => {
    const test = 'cai dat'
    console.log(test)
    return (
        <>
            <View>
            <View style={styles.header}>
                    <Text style={styles.textHeader}>Cài đặt</Text>
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
})
export default Setting;