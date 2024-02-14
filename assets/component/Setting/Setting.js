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
import { faGear, faFloppyDisk, faRightFromBracket, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, CheckBox, Button } from '@rneui/themed';
import { backGround  , colorActive ,colorText } from '../../Redux/themeColorReducer';
import {setLogin} from '../../Redux/loginReducer';




const Setting = () => {
    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);

    const [openList, setOpenList] = useState(false)

    const handleOpen = () => {
        setOpenList(prev => !prev)
    }
    const dispatch = useDispatch()

    const [interfaceColors, setInterfaceColor] = useState([
        {
            id: 1,
            title: 'Trắng',
            check: false,
            color: '#F5F5F5'

        },
        {
            id: 2,
            title: 'Hồng',
            check: false,
            color: '#FFF0F5'
        },
        {
            id: 3,
            title: 'Đen',
            check: false,
            color: '#383838'

        },

    ])
    const handleClickCheck = (id) => {
        const defaultValue = interfaceColors.forEach(item => item.check = false)
        setInterfaceColor(defaultValue)
        const index = interfaceColors.findIndex((item) => item.id == id)
        let _interfaceColors = [...interfaceColors];
        _interfaceColors[index]['check'] = true
        setInterfaceColor(_interfaceColors)
    }

    const handleSaveTheme = () => {
        const check = interfaceColors.filter((item) => item.check == true);
        const theme = check[0]?.title
        if (check && check.length > 0) {
            if (theme == 'Hồng') {
                dispatch(backGround('#FFF0F5'));
                dispatch(colorActive('#F08080'));
                dispatch(colorText('#000'));
            }
            if (theme == 'Đen') {
                dispatch(backGround('#000'));
                dispatch(colorActive('#585858'));
                dispatch(colorText('#fff'));
            }
            if (theme == 'Trắng') {
                dispatch(backGround('#F0F0F0'));
                dispatch(colorActive('#585858'));
                dispatch(colorText('#000'));
            }
        }

    }

    const handleLogOut = () => {
        const payload = {
                token: '',
                isAuthentication : false
        }
        dispatch(setLogin(payload))
    }
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: themeBackGround }]}>
                    <Text style={[styles.textHeader, { color: themeColorText }]}>Cài đặt</Text>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity onPress={handleOpen} style={styles.bodyItem} >
                        <ListItem containerStyle={{ borderRadius: 10 }}>
                            <ListItem.Content>
                                <ListItem.Title style={{ color: "#000" }}>
                                    <FontAwesomeIcon
                                        style={{ paddingHorizontal: 20, fontSize: 20 }} icon={faGear} />Thay màu chủ đề
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color="#000" />
                        </ListItem>
                    </TouchableOpacity>

                    {openList && <View style={styles.listCheckBox}>
                        <Text style={{ paddingVertical: 10, fontWeight: 600, fontSize: 16 }} >Chọn chủ đề </Text>
                        <View style={styles.checkbox}>
                            {interfaceColors.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <CheckBox
                                            containerStyle={{ backgroundColor: item.color, borderRadius: 10 }}
                                            checkedColor={{ color: '#000' }}
                                            title={item.title}
                                            checked={item.check}
                                            onPress={() => handleClickCheck(item.id)}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                        <Button onPress={handleSaveTheme} size='lg' containerStyle={{ marginHorizontal: 20, width: 150 }} radius={"lg"} color={themeBackGround} type="solid">
                          <Text style={{color:themeColorText,fontWeight:600,fontSize:15}}>Lưu thay đổi</Text> 
                            <FontAwesomeIcon style={{ color: themeColorText, marginLeft: 15 }} icon={faFloppyDisk} />
                        </Button>
                    </View>}
                    <TouchableOpacity  style={styles.bodyItem} >
                        <ListItem containerStyle={{ borderRadius: 10 }}>
                            <ListItem.Content>
                                <ListItem.Title style={{ color: "#000" }}>
                                    <FontAwesomeIcon
                                        style={{ paddingHorizontal: 20, fontSize: 20 }} icon={faChartPie} /> Báo cáo trong năm
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color="#000" />
                        </ListItem>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogOut} style={styles.bodyItem} >
                        <ListItem containerStyle={{ borderRadius: 10 }}>
                            <ListItem.Content>
                                <ListItem.Title style={{ color: "#000" }}>
                                    <FontAwesomeIcon
                                        style={{ paddingHorizontal: 20, fontSize: 20 }} icon={faRightFromBracket} /> Đăng Xuất
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color="#000" />
                        </ListItem>
                    </TouchableOpacity>


                </View >
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        height: 100,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textHeader: {
        paddingVertical: 15,
        fontSize: 18,
    },
    body: {
        paddingVertical: 40

    },
    bodyItem: {
        marginHorizontal: 20,
        marginVertical: 5
    },
    listCheckBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 200,
        marginHorizontal: 20,
        marginVertical: 30,
        borderRadius: 15


    },
    checkbox: {
        marginHorizontal: 10,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    }
})
export default Setting;