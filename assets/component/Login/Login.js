import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { faUser, faKey, faPhone, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ToastManager, { Toast } from 'toastify-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/loginReducer';
import { fetchUser, fetchUserRegister ,fetchHistory,fetchDelete   } from "../../service/userService"
import { listHistory } from '../../Redux/userListReducer';





const Login = () => {
    const dispatch = useDispatch();
    const handlePressScreen = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi chạm vào màn hình
    };
    const [openRegister, setOpenRegister] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleOpenRegister = () => {
        setOpenRegister(prev => !prev)
    }

    const validInput = (user, password, againPassword, phone) => {
        if (user == '' || password == '' || againPassword == '' || phone == '') {
            Toast.error('Vui lòng nhập đủ thông tin')
            return false;
        } else if (password.length < 6) {
            Toast.error('Mật khẩu phải trên 6 kí tự')
            return false;
        } else if (password !== againPassword) {
            Toast.error('Mật khẩu nhập lại không đúng')
            return false;
        } else {
            setUser('');
            setPassword('');
            setAgainPassword('');
            setPhone('');
            handleOpenRegister();
            return true;
        }
    }
    const handleLogin = async () => {
        const userData = {
            username: user,
            password: password
        }
        if (!openRegister) {
            if (user == '' && password == '') {
                Toast.error('Vui lòng nhập thông tin')
                return;
            }
            try {
                let res = await fetchUser(userData);
                const data = res.data;
                if (data && data.EC === 0) {
                    dispatch(setLogin(data.DT))
                    let pushHistory = await fetchHistory(user);
                    if (pushHistory.data.EC === 0) {
                        dispatch(listHistory(pushHistory.data.DT))
                    }
                } else {
                    Toast.error(data.EM)
                }
            } catch (err) {
                console.error(err)
            }

            // const payload = {
            //     user: user,
            //     token: 'fake token',
            //     isAuthentication: true,
            // }
            // dispatch(setLogin(payload))

        } else {
            const Register = {
                username: user,
                password: password,
                phone: phone
            }
            try {
                const check = validInput(user, password, againPassword, phone);
                if (check) {
                    let res = await fetchUserRegister(Register)
                    const data = res.data;
                    if (data && data.EC === 0) {
                        Toast.success(data.EM)
                    } else {
                        Toast.error(data.EM)
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }

    }




    return (
        <>
            <View style={styles.container}>
                <ToastManager textStyle={{ fontSize: 14 }} width={300} height={50}
                //  positionValue={-80}
                />
                <View style={styles.header}>
                    <FontAwesomeIcon icon={faPiggyBank} color="#F08080" size={50} />
                    <Text style={{ color: '#F08080', fontSize: 15, fontWeight: 700 }}>Sổ chi tiêu</Text>
                </View>

                <TouchableWithoutFeedback onPress={handlePressScreen} styles={styles.body}>
                    <View style={styles.form}>
                        <Input
                            leftIcon={<FontAwesomeIcon icon={faUser} />}
                            placeholder={!openRegister ? 'Tên tài khoản' : "Email"}
                            value={user}
                            onChangeText={(value) => setUser(value)}
                        />
                        <Input
                            placeholder="Mật khẩu"
                            leftIcon={<FontAwesomeIcon icon={faKey} />}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />
                        {openRegister && <>
                            <Input
                                placeholder="Nhập lại mật khẩu"
                                leftIcon={<FontAwesomeIcon icon={faKey} />}
                                secureTextEntry={true}
                                value={againPassword}
                                onChangeText={(value) => setAgainPassword(value)}
                            />
                            <Input
                                placeholder="Số điện thoại"
                                leftIcon={<FontAwesomeIcon icon={faPhone} />}
                                keyboardType='numeric'
                                value={phone}
                                onChangeText={(value) => setPhone(value)}
                            />

                        </>}

                        <Button onPress={handleLogin} buttonStyle={{ borderColor: "#000", borderWidth: 0.5, borderRadius: 7, marginTop: 30 }} size='lg' color="#FFF0F5">
                            <Text style={{ color: '#000', fontSize: 15, fontWeight: 600 }}>
                                {!openRegister ? 'Đăng nhập' : 'Đăng kí'}
                            </Text>
                        </Button>
                        {!openRegister && <>
                            <Button buttonStyle={{ marginTop: 10 }} disabled type="clear"  >
                                <Text style={{ color: '#000', fontSize: 10, fontWeight: 600 }}>
                                    Quên mật khẩu ?
                                </Text>
                            </Button>
                        </>}
                        <Button buttonStyle={{ marginTop: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }} disabled type="clear"  >
                        </Button>
                        <View style={{ alignItems: 'center' }}>
                            <Button onPress={handleOpenRegister} containerStyle={{ width: 150 }} buttonStyle={{ borderColor: "#000", borderWidth: 0.5, borderRadius: 7, marginTop: 30 }} size='lg' color="#F08080">
                                <Text style={{ color: '#000', fontSize: 15, fontWeight: 600 }}>
                                    {!openRegister ? 'Tạo tài khoản' : 'Quay lại'}
                                </Text>
                            </Button>
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F5'

    },
    header: {
        // flex: 1,
        // height: 500,
        width: 150,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 15,
        gap: 5,
        backgroundColor: '#FFF0F5',


    },

    body: {
        flex: 1,
        marginBottom: 300


    },
    footer: {
        flex: 1
    },
    form: {
        width: 380,
        // height: 400,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginVertical: 3,
        marginHorizontal: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    }
})

export default Login

