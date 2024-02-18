import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart } from "react-native-gifted-charts";
import dayjs from 'dayjs';

const Annually = (props) => {
    const [chiTieu, setChiTieu] = useState([]);
    const [thuNhap, setThuNhap] = useState([]);

    // tính phần trăm chi tiêu
    const [anUong, setAnUong] = useState(0);
    const [diLai, setDiLai] = useState(0);
    const [chiTieuTotal, setChiTieuTotal] = useState(0);
    const [hoaDon, setHoaDon] = useState(0);
    const [quanAo, setQuanAo] = useState(0);
    const [daoThe, setDaoThe] = useState(0);
    const [lienHoan, setLienHoan] = useState(0);
    const [chiTieuKhac, setChiTieuKhac] = useState(0);
    const [myPham, setMyPham] = useState(0);

    // tính phần trăm thu nhập
    const [tienLuong, setTienLuong] = useState(0);
    const [phuCap, setPhuCap] = useState(0);
    const [thuNhapTotal, setThuNhapToTal] = useState(0);
    const [dauTu, setDauTu] = useState(0);
    const [tienThuong, setTienThuong] = useState(0);
    const [thuNhapKhac, setThuNhapKhac] = useState(0);

    // console.log("check", anUong, diLai, chiTieuTotal, hoaDon, quanAo, daoThe, lienHoan, chiTieuKhac, myPham, tienLuong, phuCap, thuNhapTotal, dauTu, tienThuong, thuNhapKhac)


    const [call, setCall] = useState(0)

    const list = useSelector(state => state.user.listHistory);

    useEffect(() => {
        if (list && list.length > 0) {
            priceTotal();
            setCall(prevCall => prevCall + 1)
        }

    }, [list]);

    useEffect(() => {
        if (chiTieu && chiTieu.length > 0 || thuNhap && thuNhap.length > 0) {
            filterChar(chiTieu, thuNhap);
        }
    }, [call])





    const themeBackGround = useSelector(state => state.themeColor.backGround);
    const themeColorActive = useSelector(state => state.themeColor.colorActive);
    const themeColorText = useSelector(state => state.themeColor.colorText);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [checkTotal, setCheckTotal] = useState(0);
    const [totalMoneySpent, setTotalMoneySpent] = useState(0);
    const [totalProceeds, setTotalProceeds] = useState(0);

    const [valueInput, setValueInput] = useState(0)

    const changeInput = (value) => {
        if (value === 0) {
            setValueInput(0)
            return;
        }
        setValueInput(1)
    }

    const calculateTotalAmount = (data) => {
        return data.reduce((total, item) => {
            const priceWithoutComma = item.price.replace(/,/g, '');
            return total + Number(priceWithoutComma);
        }, 0);
    };
    const priceTotal = () => {
        const currentDate = dayjs();
        const day = currentDate.format('DD-MM-YYYY');
        const moneySpent = list.filter((item) => item.type == "moneySpent" && item.time.slice(6) == day.slice(6));
        const proceeds = list.filter((item) => item.type == "proceeds" && item.time.slice(6) == day.slice(6));
        setChiTieu(moneySpent);
        setThuNhap(proceeds);
        let totalMoneySpent = calculateTotalAmount(moneySpent)
        setTotalMoneySpent(totalMoneySpent)
        let totalProceeds = calculateTotalAmount(proceeds)
        setTotalProceeds(totalProceeds)

        let checkTotal = totalProceeds - totalMoneySpent;
        setCheckTotal(checkTotal);
    }


    const filterChar = (moneySpent, proceeds) => {

        if (moneySpent && moneySpent.length > 0) {
            let total = moneySpent.reduce((a, b) => {
                let priceWithoutComma = b.price.replace(/,/g, '');
                return Number(a) + Number(priceWithoutComma)
            }, 0)
            if (total > 0) {
                const _anUong = moneySpent.filter((item) => item.category == 'Ăn uống')
                let totalAnUong = _anUong.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceAnUong = Number(totalAnUong / total) * 100 || 0
                setAnUong(priceAnUong)

                const _diLai = moneySpent.filter((item) => item.category == 'Đi lại')
                let totalDiLai = _diLai.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceDiLai = Number(totalDiLai / total) * 100 || 0
                setDiLai(priceDiLai)

                const _chiTieuTotal = moneySpent.filter((item) => item.category == 'Chi tiêu')
                let totalChiTieu = _chiTieuTotal.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceChiTieu = Number(totalChiTieu / total) * 100 || 0
                setChiTieuTotal(priceChiTieu)

                const _hoaDon = moneySpent.filter((item) => item.category == 'Hóa đơn')
                let totalHoaDon = _hoaDon.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceHoaDon = Number(totalHoaDon / total) * 100 || 0
                setHoaDon(priceHoaDon)

                const _quanAo = moneySpent.filter((item) => item.category == 'Quần áo')
                let totalQuanAo = _quanAo.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceQuanAo = Number(totalQuanAo / total) * 100 || 0
                setQuanAo(priceQuanAo)

                const _daoThe = moneySpent.filter((item) => item.category == 'Đáo thẻ')
                let totalDaoThe = _daoThe.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceDaoThe = Number(totalDaoThe / total) * 100 || 0
                setDaoThe(priceDaoThe)

                const _lienHoan = moneySpent.filter((item) => item.category == 'Liên hoan')
                let totalLienHoan = _lienHoan.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceLienHoan = Number(totalLienHoan / total) * 100 || 0
                setLienHoan(priceLienHoan)

                const chiTieuKhac = moneySpent.filter((item) => item.category == 'Khác')
                let totalChiTieuKhac = chiTieuKhac.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceChiTieuKhac = Number(totalChiTieuKhac / total) * 100 || 0
                setChiTieuKhac(priceChiTieuKhac)

                const _myPham = moneySpent.filter((item) => item.category == 'Mỹ phẩm')
                let totalMyPham = _myPham.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceMyPham = Number(totalMyPham / total) * 100 || 0
                setMyPham(priceMyPham)
            }

        }

        if (proceeds && proceeds.length > 0) {
            let total = proceeds.reduce((a, b) => {
                let priceWithoutComma = b.price.replace(/,/g, '');
                return Number(a) + Number(priceWithoutComma)
            }, 0)
            if (total > 0) {
                const _tienLuong = proceeds.filter((item) => item.category == 'Tiền lương')
                let totalTienLuong = _tienLuong.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceTienLuong = Number(totalTienLuong / total) * 100 || 0
                setTienLuong(priceTienLuong)

                const _phuCap = proceeds.filter((item) => item.category == 'Tiền phụ cấp')
                let totalPhuCap = _phuCap.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let pricePhuCap = Number(totalPhuCap / total) * 100 || 0
                setPhuCap(pricePhuCap)

                const _thuNhapToTal = proceeds.filter((item) => item.category == 'Thu nhập phụ')
                let totalthuNhapToTal = _thuNhapToTal.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceThuNhapTotal = Number(totalthuNhapToTal / total) * 100 || 0
                setThuNhapToTal(priceThuNhapTotal)

                const _dauTu = proceeds.filter((item) => item.category == 'Đầu tư')
                let totalDauTu = _dauTu.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceDauTu = Number(totalDauTu / total) * 100 || 0
                setDauTu(priceDauTu)

                const _tienThuong = proceeds.filter((item) => item.category == 'Tiền thưởng')
                let totalTienThuong = _tienThuong.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceTienThuong = Number(totalTienThuong / total) * 100 || 0
                setTienThuong(priceTienThuong)

                const _thuNhapKhac = proceeds.filter((item) => item.category == 'Khác')
                let totalThuNhapKhac = _thuNhapKhac.reduce((a, b) => {
                    let priceWithoutComma = b.price.replace(/,/g, '');
                    return Number(a) + Number(priceWithoutComma)
                }, 0)
                let priceThuNhapKhac = Number(totalThuNhapKhac / total) * 100 || 0
                setThuNhapKhac(priceThuNhapKhac)
            }

        }
        return;

    }




    // chi tieu lon nhat
    let maxTotalMoneySpent = [
        {
            title: 'Ăn uống',
            total: anUong
        },
        {
            title: 'Đi lại',
            total: diLai
        },
        {
            title: 'Chi tiêu',
            total: chiTieuTotal
        },
        {
            title: 'Hóa đơn',
            total: hoaDon
        },
        {
            title: 'Quần áo',
            total: quanAo
        },
        {
            title: 'Mỹ phẩm',
            total: myPham
        },
        {
            title: 'Đáo thẻ',
            total: daoThe
        },
        {
            title: 'Liên hoan',
            total: lienHoan
        },
        {
            title: 'Khác',
            total: chiTieuKhac
        },
    ]
    let maxElement = maxTotalMoneySpent[0]; // Gán phần tử đầu tiên là phần tử có total lớn nhất

    maxTotalMoneySpent.forEach((element) => {
        if (element.total > maxElement.total) {
            maxElement = element; // Gán phần tử có total lớn hơn là phần tử có total lớn nhất
        }
    });

    // thu nhap nhieu nhat 

    let maxTotalProceeds = [
        {
            title: 'Tiền lương',
            total: tienLuong
        },
        {
            title: 'Thu nhập',
            total: phuCap
        },
        {
            title: 'Thu nhập',
            total: thuNhapTotal
        },
        {
            title: 'Đầu tư',
            total: dauTu
        },
        {
            title: 'Tiền thưởng',
            total: tienThuong
        },
        {
            title: 'Khác',
            total: thuNhapKhac
        },
    ]
    let maxElementProceeds = maxTotalProceeds[0]; // Gán phần tử đầu tiên là phần tử có total lớn nhất

    maxTotalProceeds.forEach((element) => {
        if (element.total > maxElementProceeds.total) {
            maxElementProceeds = element; // Gán phần tử có total lớn hơn là phần tử có total lớn nhất
        }
    });




    //test char
    const pieData = [
        { value: anUong !== 0 ? anUong : 0, color: '#009FFF', gradientCenterColor: '#006DFF' },
        { value: diLai !== 0 ? diLai : 0, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: chiTieuTotal !== 0 ? chiTieuTotal : 0, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: hoaDon !== 0 ? hoaDon : 1, color: '#FFA5BA', gradientCenterColor: '#FF7F97', focused: true },
        { value: quanAo !== 0 ? quanAo : 0, color: '#ccc', gradientCenterColor: '#000' },
        { value: myPham !== 0 ? myPham : 0, color: '#339933', gradientCenterColor: '#009900' },
        { value: daoThe !== 0 ? quanAo : 0, color: '#000', gradientCenterColor: '#FFF' },
        { value: lienHoan !== 0 ? lienHoan : 0, color: '#FF9966', gradientCenterColor: '#FFFF66' },
        { value: chiTieuKhac !== 0 ? chiTieuKhac : 0, color: '#CC0033', gradientCenterColor: '#FF6633' },

    ];
    const pieDataProceeds = [
        { value: tienLuong !== 0 ? tienLuong : 0, color: '#009FFF', gradientCenterColor: '#006DFF' },
        { value: phuCap !== 0 ? phuCap : 0, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: thuNhapTotal !== 0 ? thuNhapTotal : 0, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: dauTu !== 0 ? dauTu : 1, color: '#FFA5BA', gradientCenterColor: '#FF7F97', focused: true },
        { value: tienThuong !== 0 ? tienThuong : 0, color: '#ccc', gradientCenterColor: '#000' },
        { value: thuNhapKhac !== 0 ? thuNhapKhac : 0, color: '#339933', gradientCenterColor: '#009900' },
    ];





    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Ăn uống: {anUong.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Tiền lương:{tienLuong.toFixed(1)}%</Text>
                        }
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#93FCF8')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Đi lại:{diLai.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Phụ cấp: {phuCap.toFixed(1)}%</Text>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#BDB2FA')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Chi tiêu:{chiTieuTotal.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Thu nhập: {thuNhapTotal.toFixed(1)}%</Text>
                        }
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FFA5BA')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Hóa đơn:{hoaDon.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Đầu tư: {dauTu.toFixed(1)}%</Text>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#ccc')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Quần áo: {quanAo.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Tiền thưởng: {tienThuong.toFixed(1)}%</Text>
                        }
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#339933')}
                        {valueInput === 0 ?
                            <Text style={{ color: themeColorText }}>Mỹ phẩm: {myPham.toFixed(1)}%</Text>
                            :
                            <Text style={{ color: themeColorText }}>Khác: {thuNhapKhac.toFixed(1)}%</Text>
                        }
                    </View>
                </View>
                {valueInput === 0 ?
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: 120,
                                    marginRight: 20,
                                }}>
                                {renderDot('#000')}
                                <Text style={{ color: themeColorText }}>Đáo thẻ: {daoThe.toFixed(1)}%</Text>
                            </View>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                                {renderDot('#FF9966')}
                                <Text style={{ color: themeColorText }}>Liên hoan: {lienHoan.toFixed(1)}%</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: 120,
                                    marginRight: 20,
                                }}>
                                {renderDot('#CC0033')}
                                <Text style={{ color: themeColorText }}>Khác : {chiTieuKhac.toFixed(1)}%</Text>
                            </View>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                            </View>
                        </View>
                    </> : ''
                }
            </>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.bodyHeader}>
                    <View style={styles.bodyHeaderItem}>
                        <Text style={{ fontSize: 12, paddingBottom: 4 }}>Thu nhập</Text>
                        <Text style={{ color: '#50C7C7', fontSize: 18 }}>{numberWithCommas(totalProceeds)}đ</Text>
                    </View>
                    <View style={styles.bodyHeaderItem}>
                        <Text style={{ fontSize: 12, paddingBottom: 4 }}>Chi tiêu</Text>
                        <Text style={{ color: '#DC143C', fontSize: 18 }}>{numberWithCommas(totalMoneySpent)}đ</Text>
                    </View>
                    <View style={styles.bodyHeaderItem}>
                        <Text style={{ fontSize: 12, paddingBottom: 4 }}>Tổng</Text>
                        <Text style={{ color: checkTotal < 0 ? '#DC143C' : '#50C7C7', fontSize: 18 }} >{numberWithCommas(checkTotal)} </Text>
                    </View>
                </View>
                <View style={styles.bodyChar}>
                    <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#fff', borderRadius: 7 }}>
                        <TouchableOpacity onPress={() => changeInput(0)} style={[styles.btnHeader, { backgroundColor: valueInput === 0 ? themeColorActive : "#fff" }]}>
                            <Text style={{ color: valueInput === 0 ? "#fff" : '#383838' }}>Chi tiêu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeInput(1)} style={[styles.btnHeader, { backgroundColor: valueInput === 1 ? themeColorActive : "#fff" }]}>
                            <Text style={{ color: valueInput === 1 ? "#fff" : '#383838' }}>Thu nhập</Text>
                        </TouchableOpacity>
                    </View>
                    {(chiTieu && chiTieu.length > 0) || (thuNhap && thuNhap.length > 0) ?
                        <View
                            style={{
                                marginVertical: 20,
                                backgroundColor: '#fff',
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    padding: 16,
                                    borderRadius: 20,
                                    backgroundColor: themeBackGround,
                                }}>
                                <Text style={{ color: themeColorText, fontSize: 16, fontWeight: 'bold' }}>
                                    Chi tiêu
                                </Text>
                                <View style={{ alignItems: 'center' }}>
                                    <PieChart
                                        data={valueInput === 0 ? pieData : pieDataProceeds}
                                        donut
                                        showGradient
                                        sectionAutoFocus
                                        radius={90}
                                        innerRadius={60}
                                        innerCircleColor={'#232B5D'}
                                        centerLabelComponent={() => {
                                            return (
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text
                                                        style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>
                                                        {valueInput === 0 ? maxElement?.total.toFixed(1) : maxElementProceeds?.total.toFixed(1)}%
                                                    </Text>
                                                    <Text style={{ fontSize: 14, color: "#fff" }}>
                                                        {valueInput === 0 ? maxElement?.title : maxElementProceeds?.title}
                                                    </Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                                {renderLegendComponent()}
                            </View>
                        </View> :
                        <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 600 }} >Không có dữ liệu</Text>
                        </View>
                    }

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    body: {

    },
    bodyHeader: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 8,
        borderRadius: 10,
    },
    bodyHeaderItem: {
        alignItems: 'center'
    },
    bodyChar: {
        backgroundColor: "#fff",
        height: 500,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center'
    },
    btnHeader: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 7


    }
})



export default Annually;