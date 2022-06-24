import { Entypo, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { apiURL } from '../api/config';
import DatePicker from '../components/datePicker';


const PitchDetail = ({ route, navigation }) => {
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
    } catch (error) {
      setFreeTime(JSON.stringify(error.message))
    }
  }

  const [postBooking, setPostBooking] = useState({
    "success": false,
  });
  const bookingHandle = (token, timeStart, miniPitchId, bookingDate) => {
    axios.post(`${apiURL}bookingservice/book`, {
      hourStart: String(timeStart),
      miniPitchId: String(miniPitchId),
      bookingDate: String(bookingDate),
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
        setPostBooking(response.data.success)
        if (!response.data.success) {
          Alert.alert('Booking failed', 'Please try again!', [
            { text: 'Okay' }
          ]);
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
        // console.log(hourStart.miniPitchId)
      }))
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          minHeight: Dimensions.get('window').height

        }}>
        <>
          <Image
            source={{
              uri: pitch.coverAvatarLink,
            }}
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
              </View>
              {(freeTime.loading) ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" animating color={'green'} />
                  {/* {console.log(isLoadingFreeTime)} */}
                </View>
                : (
                  <View style={{
                    paddingLeft: 115,
                    marginRight: 5,
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                  }}>
                    
                    {freeTime.data.map(freeTime => (
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
                  </View>)}
            </View>
            : null}

        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={hourStart.modalVisible}
          onRequestClose={() => {
            setHourStart({
              hourStart: hourStart.hourStart,
              miniPitchId: hourStart.miniPitchId,
              modalVisible: !hourStart.modalVisible
            })
          }
          }
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Chọn sân</Text>
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
                    width: 200,
                    height: 30,
                    paddingHorizontal: 10,
                    marginLeft: 16,
                    marginTop: 10,
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
          <View style={styles.infoContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <View style={styles.text}>
            {/* {console.log(pitch.detail)} */}
              {pitch.detail.map(pitchDetail => (
                <View key={pitchDetail.pitchTypeId}>
                  <Text style={styles.pitchDetailName}>{pitchDetail.pitchTypeName}</Text>
                  {pitchDetail.timeSlots.map(timeSlots => (
                    <View style={styles.timePrice} key={new Date().getTime().toString()}>
                      <Text style={styles.time}>{timeSlots.timeStart.slice(0, 5)} - {timeSlots.timeEnd.slice(0, 5)}   {timeSlots.dayOfWeekStart} - {(timeSlots.dayOfWeekEnd == 8) ? 'cn' : timeSlots.dayOfWeekEnd}</Text>
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
    paddingTop: Constants.statusBarHeight,
  },

  result: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  headerContainer: {
    height: 100,
    backgroundColor: '#368340',
    justifyContent: 'center',
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
  },

  pitchName: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    marginTop: 2,
  },

  pitchAddress: {
    width: '100%',
    flex: 2,
    paddingVertical: 5,
    lineHeight: 20,
    marginLeft: 10,
  },

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

  price: {
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
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
})