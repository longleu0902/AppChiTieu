import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';




const Report = () => {
  const defaultValue = [
    {
      title: 'Tháng 1',
      total: 0
    },
    {
      title: 'Tháng 2',
      total: 0
    },
    {
      title: 'Tháng 3',
      total: 0
    },
    {
      title: 'Tháng 4',
      total: 0
    },
    {
      title: 'Tháng 5',
      total: 0
    },
    {
      title: 'Tháng 6',
      total: 0
    },
    {
      title: 'Tháng 7',
      total: 0
    },
    {
      title: 'Tháng 8',
      total: 0
    },
    {
      title: 'Tháng 9',
      total: 0
    },
    {
      title: 'Tháng 10',
      total: 0
    },
    {
      title: 'Tháng 11',
      total: 0
    },
    {
      title: 'Tháng 12',
      total: 0
    },
  ]

  const [valueInput, setValueInput] = useState(0);
  const [renderMoneyList, setRenderMoneyList] = useState(defaultValue);
  const [renderProceeds ,setRenderProceeds] = useState(defaultValue);

  

  const list = useSelector(state => state.user.listHistory);

  useEffect(() => {
    buildData();
  }, [])

  const buildData = () => {
    const currentDate = dayjs();
    const day = currentDate.format('DD-MM-YYYY');
    const _list = [...list];
    const moneySpent = _list.filter((item) => item.type === 'moneySpent' && item.time.slice(6) === day.slice(6));
    const proceeds = _list.filter((item) => item.type === 'proceeds' && item.time.slice(6) === day.slice(6));
    if (moneySpent && moneySpent.length > 0) {
      const totalOne = moneySpent
        .filter(item => item.time.slice(3, 5) === '01')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalTwo = moneySpent
        .filter(item => item.time.slice(3, 5) === '02')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalThree = moneySpent
        .filter(item => item.time.slice(3, 5) === '03')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalFour = moneySpent
        .filter(item => item.time.slice(3, 5) === '04')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalFive = moneySpent
        .filter(item => item.time.slice(3, 5) === '05')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalSix = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalSeven = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalEight = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalNine = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalTen = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalEleven = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);
      const totalTwelve = moneySpent
        .filter(item => item.time.slice(3, 5) === '06')
        .reduce((a, b) => {
          const priceWithoutComma = b.price.replace(/,/g, '');
          return Number(a) + Number(priceWithoutComma);
        }, 0);

      const arr = [
        {
          title: 'Tháng 1',
          total: totalOne
        },
        {
          title: 'Tháng 2',
          total: totalTwo
        },
        {
          title: 'Tháng 3',
          total: totalThree
        },
        {
          title: 'Tháng 4',
          total: totalFour
        },
        {
          title: 'Tháng 5',
          total: totalFive
        },
        {
          title: 'Tháng 6',
          total: totalSix
        },
        {
          title: 'Tháng 7',
          total: totalSeven
        },
        {
          title: 'Tháng 8',
          total: totalEight
        },
        {
          title: 'Tháng 9',
          total: totalNine
        },
        {
          title: 'Tháng 10',
          total: totalTen
        },
        {
          title: 'Tháng 11',
          total: totalEleven
        },
        {
          title: 'Tháng 12',
          total: totalTwelve
        },
      ]
      setRenderMoneyList(arr)
    }
    if(proceeds && proceeds.length > 0){
      const totalOne = proceeds
      .filter(item => item.time.slice(3, 5) === '01')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalTwo = proceeds
      .filter(item => item.time.slice(3, 5) === '02')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalThree = proceeds
      .filter(item => item.time.slice(3, 5) === '03')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalFour = proceeds
      .filter(item => item.time.slice(3, 5) === '04')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalFive = proceeds
      .filter(item => item.time.slice(3, 5) === '05')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalSix = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalSeven = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalEight = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalNine = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalTen = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalEleven = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);
    const totalTwelve = proceeds
      .filter(item => item.time.slice(3, 5) === '06')
      .reduce((a, b) => {
        const priceWithoutComma = b.price.replace(/,/g, '');
        return Number(a) + Number(priceWithoutComma);
      }, 0);

    const arr = [
      {
        title: 'Tháng 1',
        total: totalOne
      },
      {
        title: 'Tháng 2',
        total: totalTwo
      },
      {
        title: 'Tháng 3',
        total: totalThree
      },
      {
        title: 'Tháng 4',
        total: totalFour
      },
      {
        title: 'Tháng 5',
        total: totalFive
      },
      {
        title: 'Tháng 6',
        total: totalSix
      },
      {
        title: 'Tháng 7',
        total: totalSeven
      },
      {
        title: 'Tháng 8',
        total: totalEight
      },
      {
        title: 'Tháng 9',
        total: totalNine
      },
      {
        title: 'Tháng 10',
        total: totalTen
      },
      {
        title: 'Tháng 11',
        total: totalEleven
      },
      {
        title: 'Tháng 12',
        total: totalTwelve
      },
    ]
    setRenderProceeds(arr)

    }
  }




  const themeBackGround = useSelector(state => state.themeColor.backGround);
  const themeColorActive = useSelector(state => state.themeColor.colorActive);
  const themeColorText = useSelector(state => state.themeColor.colorText);

  const changeInput = (value) => {
    if (value === 0) {
      setValueInput(0)
      return;
    }
    setValueInput(1)
  }
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


  return (
    <>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#fff', borderRadius: 7 }}>
            <TouchableOpacity onPress={() => changeInput(0)} style={[styles.btnHeader, { backgroundColor: valueInput === 0 ? themeColorActive : "#fff" }]}>
              <Text style={{ color: valueInput === 0 ? "#fff" : '#383838' }}>Chi tiêu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeInput(1)} style={[styles.btnHeader, { backgroundColor: valueInput === 1 ? themeColorActive : "#fff" }]}>
              <Text style={{ color: valueInput === 1 ? "#fff" : '#383838' }}>Thu nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        {valueInput === 0 ? <>
          {renderMoneyList && renderMoneyList.length > 0 &&
            renderMoneyList.map((item, index) => {
              return (
                <View key={index} style={styles.list}>
                  <Text style={{ marginLeft: 20 ,fontWeight : 600}}>{item?.title}</Text>
                  <Text style={{ marginRight: 20 ,fontWeight : 600  }}>{numberWithCommas(item?.total)} đ</Text>
                </View>
              )
            })
          }
        </>
          :
          <>
            {renderProceeds && renderProceeds.length > 0 &&
            renderProceeds.map((item, index) => {
              return (
                <View key={index} style={styles.list}>
                  <Text style={{ marginLeft: 20 ,fontWeight : 600}}>{item?.title}</Text>
                  <Text style={{ marginRight: 20 ,fontWeight : 600  }}>{numberWithCommas(item?.total)} đ</Text>
                </View>
              )
            })
          }
          </>

        }



      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal : 20 ,
    marginVertical: 20,


  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,

  },
  header: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  btnHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7
  }
})

export default Report;