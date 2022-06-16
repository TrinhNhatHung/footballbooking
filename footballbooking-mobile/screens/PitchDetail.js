import { StyleSheet, Text, View, ScrollView, Platform, Image, Dimensions, TouchableOpacity, Alert, ActivityIndicator, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import { Entypo, FontAwesome, } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PitchItem from '../components/pitchItem';
import Search from '../components/search';
import DatePicker from '../components/datePicker';
import TimeSlot from '../components/timeSlot';
import { apiURL } from '../api/config';

import anhSanBong from '../assets/images/sanbong.jpg'

const PitchDetail = ({ route, navigation }) => {
  // const apiURL = 'http://192.168.1.5:8080/';
  const { pitch } = route.params
  const [showCalender, setShowCalender] = useState(false);
  const [pitchTypeId, setPitchTypeId] = useState('1');
  const [isReady, setisReady] = useState(true);
  const [hourStart, setHourStart] = useState({
    hourStart: '00:00',
    miniPitchId: [],
    modalVisible: false,
  });

  const [date, setDate] = useState({
    date: moment().format('YYYY/MM/DD').toString()

  })
  const getDate = (childData) => {
    setDate({ date: childData })
  }

  // const getTime = (childData) => {
  //   setHourStart({ hourStart: childData })
  // }

  // arrayA = []
  arrayTemp = []
  arrayData = []
  count = 0;

  // const [modalVisible, setModalVisible] = useState(false);
  const [userToken, setUserToken] = useState('')

  useEffect(() => {
    getData();

    return () => {

    }
  }, [])

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken')
      setUserToken({ userToken: token })
      if (token !== null) {
        // value previously stored
      }
      console.log(userToken);
    } catch (e) {
      console.log(e.message)
    }
  }

  const [freeTime, setFreeTime] = useState({
    loading: true,
    data: [],
  })
  // const [arrayFreeTime, setArrayFreeTime] = useState([])
  // const [isLoadingFreeTime, setIsLoadingFreeTime] = useState(true)
  const callGetFreeTimeSlot = async (bookingDate, pitchId, pitchTypeId) => {
    try {
      setFreeTime({
        loading: true,
        data: [],
        pitchTypeId: pitchTypeId
      })
      const res = await axios.get(`${apiURL}bookingservice/getFreeTimeSlot?bookingDate=${bookingDate}&pitchId=${pitchId}&pitchTypeId=${pitchTypeId}`);
      // setFreeTime({
      //   loading: false,
      //   data: res.data
      // })
      count = 0;
      res.data.data.forEach(function (element) {
        if (element.hasPitch == true) {
          count = arrayTemp.push({
            timeStart: element.timeStart,
            miniPitchId: element.miniPitchId
          })

          // console.log(element.timeStart)
        }

        // console.log(arrayTemp[0].timeStart.slice(0,2))
        // console.log(moment().add(10, 'minutes').format('hh:mm'))
        if (bookingDate == moment().format('YYYY/MM/DD').toString()) {
          arrayData = arrayTemp.filter(function (data) {
            // console.log(data.timeStart.slice(0,2) > moment().add(10, 'minutes').format('hh').toString())
            return data.timeStart.slice(0, 2) > moment().add(10, 'minutes').format('HH').toString();
          });
        } else arrayData = arrayTemp;
        // console.log(arrayFreeTime)
      })
      setFreeTime({
        loading: false,
        data: arrayData,
        pitchTypeId: pitchTypeId
      })
      // setIsLoadingFreeTime({ isLoadingFreeTime: false })
      // arrayA = res.data.data
      // arrayTemp = [0]
      // arrayA.forEach(function (element) {
      //   if (element.hasPitch == true) {
      //     // arrayTemp = arrayTemp.push(element.timeStart)
      //     // setArrayFreeTime(arrayTemp)
      //     console.log(element.timeStart)
      //   }
      //   // console.log(element.timeStart)
      // });
      // console.log(arrayA)
      // console.log(arrayTemp)
      // console.log(res.data.data)
    } catch (error) {
      setFreeTime(JSON.stringify(error.message))
    }
  }

  // const getArrayFreeTimeSlot = (array) => {
  //   arrayTemp = []
  //   count = 0
  //   array.forEach(function (element) {
  //     if (element.hasPitch == true) {
  //       count = arrayTemp.push(element.timeStart)
  //       setArrayFreeTime(arrayTemp)
  //       // console.log(element.timeStart)
  //     }
  //     console.log(arrayTemp)
  //     // console.log(arrayFreeTime)
  //   })
  // }

  const [postBooking, setPostBooking] = useState({
    "success": false,
  });
  const bookingHandle = (token, timeStart, miniPitchId, bookingDate) => {
    axios.post(`${apiURL}bookingservice/book`, {
      hourStart: String(timeStart),
      miniPitchId: String(miniPitchId),
      bookingDate: String(bookingDate),
      // phone: userName,
      // password: password
    }, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        // console.log(response.data.data)
        return response
      })
      .then((response => {
        // userAuthen = response.data.data.isAuthen
        setPostBooking(response.data.success)
        console.log(postBooking)
        if (!response.data.success) {
          Alert.alert('Booking failed', 'Please try again!', [
            { text: 'Okay' }
          ]);
          // setHourStart({
          //   hourStart: hourStart.hourStart,
          //   miniPitchId: hourStart.miniPitchId.splice(hourStart.miniPitchId.indexOf('miniPitchId'),1),
          //   modalVisible: !hourStart.modalVisible
          // })
          return;
        }
        Alert.alert('Success', 'Your booking has been sent', [
          { text: 'Okay' }
        ]);
        hourStart.miniPitchId.splice(hourStart.miniPitchId.indexOf(miniPitchId), 1)
        setHourStart({
          hourStart: hourStart.hourStart,
          miniPitchId: hourStart.miniPitchId,
          modalVisible: !hourStart.modalVisible
        })
        console.log(hourStart.miniPitchId)
      }))
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar translucent backgroundColor='transparent' /> */}
      {/* <StatusBar backgroundColor='#368340'></StatusBar>
      <View style={styles.headerContainer}>

      </View> */}

      <ScrollView
        style={{
          minHeight: Dimensions.get('window').height

        }}>
        <>
          <Image
            source={anhSanBong}
            style={{
              width: '100%',
              height: null,
              aspectRatio: 590 / 394
            }}></Image>
        </>
        <View style={{
          marginTop: 10,
          marginLeft: 10,
        }}>
          {/* <Text style={styles.result}>Kết quả</Text> */}
        </View>
        <View style={{
          paddingVertical: 20
        }}>
          {showCalender ?
            <View style={{
              flexDirection: 'row',
              minHeight: 90,
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: 1,
              borderTopColor: '#d9d9d9',
              borderTopWidth: 1,
              paddingVertical: 10,
            }}>
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <DatePicker parentCallback={getDate} updateFreeTime={callGetFreeTimeSlot} pitchId={pitch.pitchId} pitchTypeId={freeTime.pitchTypeId}></DatePicker>
                {
                  // console.log(date.date + "..." + pitch.pitchId + "..." + pitchTypeId.pitchTypeId)
                  // callGetFreeTimeSlot(date.date, pitch.pitchId, pitchTypeId.pitchTypeId)
                }
                {/* <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: 100,
                    height: 30,
                    paddingHorizontal: 10,
                    marginLeft: 16,
                    marginBottom: 10,
                    backgroundColor: '#368340',
                  }}
                  onPress={() => {
                    bookingHandle(userToken.userToken, hourStart.hourStart, '1', date.date);
                    // console.log(userToken.userToken+'.....'+hourStart.hourStart+'......'+'1'+'.......'+ date.date)
                  }}
                >
                  <Text style={{ color: 'white', textTransform: 'uppercase', }}>Đặt sân</Text>
                </TouchableOpacity> */}
              </View>
              {(freeTime.loading) ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" animating color={'green'} />
                  {/* {console.log(isLoadingFreeTime)} */}
                </View>
                : (
                  <View style={{
                    // flex: 3,
                    // //alignItems: 'center',
                    // justifyContent: 'space-around',
                    // flexDirection: 'row',
                    paddingLeft: 115,
                    // paddingRight: 10,

                    marginRight: 5,
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                  }}>
                    {/* <FlatList
                  data={arrayFreeTime}
                  renderItem={({ item }) => <TimeSlot time={item} parentCallback={getTime}/>}
                  keyExtractor={item => item.id}
                /> */}
                    {freeTime.data.map(freeTime => (
                      // <TimeSlot time={freeTime.timeStart} parentCallback={getTime} />
                      <View style={styles.timeSlotContainer} key={freeTime.timeStart}>
                        <TouchableOpacity

                          onPress={() => {
                            setHourStart({
                              hourStart: freeTime.timeStart,
                              miniPitchId: freeTime.miniPitchId,
                              modalVisible: true,
                            });
                            // setModalVisible(true)
                          }}>
                          <Text>{freeTime.timeStart}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    {/* {console.log(freeTime.data.timeStart)} */}
                    {/* <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'05:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'06:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'07:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'08:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>

                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'09:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'10:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'11:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'12:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>

                </View>


                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'13:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'14:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'15:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'16:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>

                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'17:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'18:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'19:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>
                  <TimeSlot time={'20:00'} arrayFreeTime={arrayFreeTime} parentCallback={getTime}></TimeSlot>

                </View> */}



                  </View>)}



            </View>
            : null}

        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={hourStart.modalVisible}
          // onBackButtonPress ={() => {
          //   setHourStart({
          //     // hourStart: hourStart.hourStart,
          //     // miniPitchId: hourStart.miniPitchId,
          //     modalVisible: !hourStart.modalVisible
          //   })
          //   console.log('Back')
          // // }}
          onRequestClose={() => {
            setHourStart({
              hourStart: hourStart.hourStart,
              miniPitchId: hourStart.miniPitchId,
              modalVisible: !hourStart.modalVisible
            })
          }
        }
          // onBackdropPress={() => console.log('Something')}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setHourStart({
        //     hourStart: hourStart.hourStart,
        //     miniPitchId: hourStart.miniPitchId,
        //     modalVisible: !hourStart.modalVisible
        //   });
        // }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Chọn sân</Text>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}

              {(hourStart.miniPitchId.length != 0) ?
                hourStart.miniPitchId.map(miniPitchId => (
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      width: 100,
                      height: 30,
                      paddingHorizontal: 10,
                      marginLeft: 16,
                      marginBottom: 10,
                      backgroundColor: '#368340',
                    }}
                    onPress={() => {
                      bookingHandle(userToken.userToken, hourStart.hourStart, miniPitchId, date.date);
                      setHourStart({
                        hourStart: hourStart.hourStart,
                        miniPitchId: hourStart.miniPitchId,
                        modalVisible: !hourStart.modalVisible
                      })
                      // console.log(userToken.userToken+'.....'+hourStart.hourStart+'......'+freeTime+'.......'+ date.date)
                    }}
                    key={miniPitchId}
                  >
                    <Text style={{ color: 'white', textTransform: 'uppercase', }}>{miniPitchId}</Text>
                  </TouchableOpacity>
                ))


                :
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: 100,
                    height: 30,
                    paddingHorizontal: 10,
                    marginLeft: 16,
                    marginBottom: 10,
                    backgroundColor: '#368340',
                  }}
                  onPress={() => {
                    setHourStart({
                      hourStart: hourStart.hourStart,
                      miniPitchId: hourStart.miniPitchId,
                      modalVisible: !hourStart.modalVisible
                    })
                    // console.log(userToken.userToken+'.....'+hourStart.hourStart+'......'+freeTime+'.......'+ date.date)
                  }}
                >
                  <Text style={{ color: 'white', textTransform: 'uppercase', }}>Tạm thời hết sân</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        </Modal>

        <View style={styles.listContainer}>
          <View style={{ flexDirection: 'row', flex: 1 }} >
            <View style={{ margin: 5 }}>
              <FontAwesome name="soccer-ball-o" size={24} color="green" />
            </View>
            <Text style={styles.pitchName}>{pitch.name}</Text>
          </View>
          {/* <Text style={styles.pitchName}>Sân Chuyên Việt</Text> */}
          <View style={{ flexDirection: 'row', flex: 1 }} >
            <View style={{ margin: 5 }}>
              <Entypo name="location-pin" size={24} color="green" />
            </View>
            <Text style={styles.pitchAddress}>{pitch.address.number} - {pitch.address.street}, {pitch.address.commune}, {pitch.address.district}, {pitch.address.city}</Text>
          </View>
          {/* <Text style={styles.pitchAddress}>11 Thích Quảng Đức, Hòa Khánh, Liên Chiểu, Đà Nẵng</Text> */}
          <View style={styles.infoContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <View style={styles.text}>
              {pitch.detail.map(pitchDetail => (
                // <TimeSlot time={freeTime.timeStart} parentCallback={getTime} />
                <View key={pitchDetail.pitchTypeId}>
                  <Text style={styles.pitchDetailName}>{pitchDetail.pitchTypeName}</Text>
                  {pitchDetail.timeSlots.map(timeSlots => (
                    <View style={styles.timePrice} key={new Date().getTime().toString()}>
                      <Text style={styles.time}>{timeSlots.timeStart} - {timeSlots.timeEnd}   {timeSlots.dayOfWeekStart} - {timeSlots.dayOfWeekEnd}</Text>
                      <Text style={styles.price}>{timeSlots.cost}</Text>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 3,
                          right: 0,
                          zIndex: 10,
                        }}
                        onPress={() => {
                          setShowCalender({ showCalender: true })
                          setPitchTypeId({ pitchTypeId: 1 })
                          callGetFreeTimeSlot(date.date, pitch.pitchId, 1)
                          // getArrayFreeTimeSlot(arrayA)
                        }}

                      >
                        <FontAwesome name="calendar-check-o" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  ))
                  }

                </View>
              ))}



              <View style={styles.phone}>
                <Text style={styles.phoneNumberTittle}>Số điện thoại:</Text>
                <Text style={styles.phoneNumber}>0356112087</Text>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PitchDetail", {
              name: 'Sân Chuyên Việt',
            })}>
            <Text style={styles.textButton}>
              Chi tiết
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View >
  )
}

export default PitchDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    // paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  headerContainer: {
    height: 100,
    backgroundColor: '#368340',
    // marginBottom: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16
  },
  tinyLogo: {
    marginLeft: 10,
    marginRight: 10,
    height: '100%',
    flex: 2,
    resizeMode: 'contain',
  },
  text: {

    flexDirection: 'column',
    marginRight: 10,
    flex: 3,
    paddingVertical: 10,
    //justifyContent: 'center',
  },
  pitchName: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    // borderBottomColor: '#d9d9d9',
    // borderBottomWidth: 1,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: 2,
  },
  pitchAddress: {
    width: '100%',
    flex: 2,
    // borderBottomColor: '#d9d9d9',
    // borderBottomWidth: 1,
    paddingVertical: 5,
    lineHeight: 20,
    marginLeft: 10,
  },
  // pitchDescription: {
  //     marginLeft: 10,
  //     flex: 2,
  // },
  pitchDetailName: {
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    flex: 1,

  },
  timePrice: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingRight: 30
  },
  time: {
    // flex: 1,
    // paddingTop: 5,
  },
  price: {
    // borderBottomColor: '#d9d9d9',
    // borderBottomWidth: 1,
    // flex: 1,
    // paddingBottom: 5,
    marginLeft: 0
  },
  phone: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  phoneNumberTittle: {

  },
  phoneNumber: {
    marginLeft: 20
  },
  button: {
    backgroundColor: '#c6c7c8',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flex: 2,
    borderRadius: 4,
  },
  textButton: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timeSlotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 58,
    height: 30,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})