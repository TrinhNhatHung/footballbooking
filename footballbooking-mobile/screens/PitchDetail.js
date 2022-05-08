import { StyleSheet, Text, View, ScrollView, Platform, Image, Dimensions, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import { Entypo, FontAwesome, } from '@expo/vector-icons';
import moment from 'moment'

import PitchItem from '../components/pitchItem';
import Search from '../components/search';
import DatePicker from '../components/datePicker';
import TimeSlot from '../components/timeSlot';

import anhSanBong from '../assets/images/sanbong.jpg'

const PitchDetail = ({ route, navigation }) => {
  const {pitch} = route.params
  const [showCalender, setShowCalender] = useState(false);
  const [isReady, setisReady] = useState(true);
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
              height: 200, 
              borderBottomColor: '#d9d9d9', 
              borderBottomWidth: 1,
              borderTopColor: '#d9d9d9', 
              borderTopWidth: 1,
              paddingVertical: 10,
              }}>
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <DatePicker></DatePicker>
                <TouchableOpacity style ={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  width: 100,
                  height: 30,
                  paddingHorizontal: 10,
                  marginLeft: 16,
                  backgroundColor: '#368340',
                }}>
                  <Text style={{color: 'white', textTransform: 'uppercase',}}>Đặt sân</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 3,
                //alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                paddingLeft: 60,
                paddingRight: 10,
                
              }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'5:00'}></TimeSlot>
                  <TimeSlot time={'6:00'}></TimeSlot>
                  <TimeSlot time={'7:00'}></TimeSlot>
                  <TimeSlot time={'8:00'}></TimeSlot>
                  
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'9:00'}></TimeSlot>
                  <TimeSlot time={'10:00'}></TimeSlot>
                  <TimeSlot time={'11:00'}></TimeSlot>
                  <TimeSlot time={'12:00'}></TimeSlot>
                  
                </View>


                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'13:00'}></TimeSlot>
                  <TimeSlot time={'14:00'}></TimeSlot>
                  <TimeSlot time={'15:00'}></TimeSlot>
                  <TimeSlot time={'16:00'}></TimeSlot>
                  
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TimeSlot time={'17:00'}></TimeSlot>
                  <TimeSlot time={'18:00'}></TimeSlot>
                  <TimeSlot time={'19:00'}></TimeSlot>
                  <TimeSlot time={'20:00'}></TimeSlot>
                  
                </View>



              </View>



            </View>
            : null}

        </View>
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

              <Text style={styles.pitchDetailName}>Sân 5</Text>
              <View style={styles.timePrice}>
                <Text style={styles.time}>5:00 - 16:00   Thứ 2 - Chủ Nhật</Text>
                <Text style={styles.price}>180.000VNĐ</Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: 0,
                    zIndex: 10,
                  }}
                  onPress={() => setShowCalender({ showCalender: true })}
                >
                  <FontAwesome name="calendar-check-o" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.timePrice}>
                <Text style={styles.time}>17:00 - 22:00 Thứ 2 - Chủ Nhật</Text>
                <Text style={styles.price}>220.000VNĐ</Text>
                <TouchableOpacity style={{
                  position: 'absolute',
                  top: 3,
                  right: 0,
                  zIndex: 10,
                }}>
                  <FontAwesome name="calendar-check-o" size={20} color="black" />
                </TouchableOpacity>
              </View>

              {/* <View style={styles.phone}>
                <Text style={styles.phoneNumberTittle}>Số điện thoại:</Text>
                <Text style={styles.phoneNumber}>0356112087</Text>
              </View> */}
            </View>
            <View style={styles.text}>

              <Text style={styles.pitchDetailName}>Sân 7</Text>
              <View style={styles.timePrice}>
                <Text style={styles.time}>5:00 - 16:00   Thứ 2 - Chủ Nhật</Text>
                <Text style={styles.price}>180.000VNĐ</Text>
                <TouchableOpacity style={{
                  position: 'absolute',
                  top: 3,
                  right: 0,
                  zIndex: 10,
                }}>
                  <FontAwesome name="calendar-check-o" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.timePrice}>
                <Text style={styles.time}>17:00 - 22:00 Thứ 2 - Chủ Nhật</Text>
                <Text style={styles.price}>220.000VNĐ</Text>
                <TouchableOpacity style={{
                  position: 'absolute',
                  top: 3,
                  right: 0,
                  zIndex: 10,
                }}>
                  <FontAwesome name="calendar-check-o" size={20} color="black" />
                </TouchableOpacity>
              </View>

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
    </View>
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
})