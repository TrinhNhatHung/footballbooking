import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import { apiURL } from '../api/config';
import anhHuySan from '../assets/icons/booking-cancel.png';
import anhDoiSan from '../assets/icons/booking-pending.png';

export default function historyItem(props) {
    const { pitch, token } = props
    const [status, setStatus] = useState(pitch.status)
    const cancelBookingHandle = (token, bookingId) => {
        // console.log(bookingId + "...." +token)
        if (pitch.time.slice(0, 10) == moment().format('DD/MM/YYYY').toString()) {
            if (pitch.time.slice(11, 16) < moment().add(20, 'minutes').format('hh:mm').toString()) { }
        }
        console.log(pitch.time.slice(11, 16) + "....+..." > moment().add(20, 'minutes').format('HH:mm').toString())
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
                setStatus('Đã huỷ')
                if (!response.data.success) {
                    Alert.alert('Cancel booking failed', 'Please try again!', [
                        { text: 'Okay' }
                    ]);
                    return;
                }
                Alert.alert('Success', 'Your booking has been cancel', [
                    { text: 'Okay' }
                ]);
            }))
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {(status == 'Đã huỷ') ?
                    <Image
                        style={styles.tinyLogo}
                        source={anhHuySan}
                    /> :
                    <Image
                        style={styles.tinyLogo}
                        source={anhDoiSan}
                    />
                }
                
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
                </View>
            </View>
            {(status == 'Đã huỷ') ?
                <TouchableOpacity
                    style={[styles.button, {
                        backgroundColor: 'red'
                    }]}
                >
                    <Text style={styles.textButton}>
                        Đã huỷ
                    </Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => cancelBookingHandle(token.userToken, pitch.bookingId)}>
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
        paddingBottom: 5,
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
    },

    time: {

    },

    price: {
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