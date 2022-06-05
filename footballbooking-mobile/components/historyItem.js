import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo, FontAwesome, } from '@expo/vector-icons';

import { PitchDetail } from "../screens"
import axios from 'axios';
import moment from 'moment';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function historyItem(props) {
    // const { pitch } = props.pitch
    // console.log(pitch)
    // const { navigation } = props.navigation
    const { pitch, token } = props
    const [status, setStatus] = useState(pitch.status)
    // const {pitch} = props
    // console.log(pitch)
    const apiURL = 'http://192.168.1.5:8080/';
    const cancelBookingHandle = (token, bookingId) => {
        // console.log(bookingId + "...." +token)
        if ( pitch.time.slice(0,10) == moment().format('DD/MM/YYYY').toString()){
            if(pitch.time.slice(11,16) < moment().add(20, 'minutes').format('hh:mm').toString()){}
        }
        console.log(pitch.time.slice(11,16) + "....+..." > moment().add(20, 'minutes').format('HH:mm').toString())
        axios.post(`${apiURL}bookingservice/cancelBookingRequest`, {
            bookingId: String(bookingId),
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data.success)
                return response
            })
            .then((response => {
                // userAuthen = response.data.data.isAuthen
                // setPostBooking(response.data.success)
                // console.log(postBooking)
                setStatus('Đã huỷ')
                if (!response.data.success) {
                    Alert.alert('Cancel booking failed', 'Please try again!', [
                        { text: 'Okay' }
                    ]);
                    // setHourStart({
                    //   hourStart: hourStart.hourStart,
                    //   miniPitchId: hourStart.miniPitchId.splice(hourStart.miniPitchId.indexOf('miniPitchId'),1),
                    //   modalVisible: !hourStart.modalVisible
                    // })
                    return;
                }
                Alert.alert('Success', 'Your booking has been cancel', [
                    { text: 'Okay' }
                ]);
                // hourStart.miniPitchId.splice(hourStart.miniPitchId.indexOf(miniPitchId), 1)
                // setHourStart({
                //     hourStart: hourStart.hourStart,
                //     miniPitchId: hourStart.miniPitchId,
                //     modalVisible: !hourStart.modalVisible
                // })
                // console.log(hourStart.miniPitchId)
            }))
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            {/* <View style={{ flexDirection: 'row', flex: 1 }} >
                <View style={{ margin: 5 }}>
                    <FontAwesome name="soccer-ball-o" size={24} color="green" />
                </View>
                <Text style={styles.pitchName}>{pitch.name}</Text>
            </View> */}
            {/* <Text style={styles.pitchName}>Sân Chuyên Việt</Text> */}
            {/* <View style={{ flexDirection: 'row', flex: 1 }} >
                <View style={{ margin: 5 }}>
                    <Entypo name="location-pin" size={24} color="green" />
                </View>
                <Text style={styles.pitchAddress}>{pitch.address.number} - {pitch.address.street}, {pitch.address.commune}, {pitch.address.district}, {pitch.address.city}</Text>
            </View> */}
            {/* <Text style={styles.pitchAddress}>11 Thích Quảng Đức, Hòa Khánh, Liên Chiểu, Đà Nẵng</Text> */}
            <View style={styles.infoContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={styles.text}>

                    <Text style={styles.pitchDetailName}>{pitch.pitchName}</Text>
                    <View style={styles.timePrice}>
                        <Text style={styles.time}>{pitch.pitchTypeName}</Text>
                        <Text style={styles.price}>{pitch.cost} VNĐ/h</Text>
                    </View>
                    <View style={styles.timePrice}>
                        <Text style={styles.time}>Thời gian:</Text>
                        <Text style={styles.price}>{pitch.time}</Text>
                    </View>

                    <View style={styles.phone}>
                        <Text style={styles.phoneNumberTittle}>Tình trạng:</Text>
                        <Text style={styles.phoneNumber}>{status}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', flex: 1 }} >
                        <Entypo name="location-pin" size={24} color="green" />
                        <Text style={styles.pitchAddress}>11 Thích Quảng Đức, Hòa Khánh, Liên Chiểu, Đà Nẵng</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }} >
                        <FontAwesome name="soccer-ball-o" size={24} color="green" />
                        <Text style={styles.pitchDescription} adjustsFontSizeToFit={true}>1 sân 5, Trung ngu, Heo ngu, Chó ngu, Sơn ngu, Đen ngu</Text>
                    </View> */}

                </View>
            </View>
            {(status == 'Đã huỷ') ?
                <TouchableOpacity
                    style={[styles.button,{
                        backgroundColor: 'red'
                    }]}
                    >
                    <Text style={styles.textButton}>
                        Đã huỷ
                    </Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cancelBookingHandle(token.userToken,pitch.bookingId)}>
                    <Text style={styles.textButton}>
                        Huỷ đặt sân
                    </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        //justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 40,
        elevation: 10,
    },

    infoContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        width: '100%',
        //height: 150,
        //backgroundColor: '#ebebeb',
        // flexWrap: 'wrap'
        // flex: 1,
        // alignItems: 'stretch',

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
        marginLeft: 20
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