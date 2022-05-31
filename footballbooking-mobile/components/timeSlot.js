import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios';


const timeSlot = (props) => {
    const { time, parentCallback } = props
    // const bookingHandle = (token, hourStart, miniPitchId, bookingDate) => {
    //     axios.post("http://192.168.2.115:8080/bookingservice/book", {
    //         hourStart: String(hourStart),
    //         miniPitchId: String(miniPitchId),
    //         bookingDate: String(bookingDate),
    //         // phone: userName,
    //         // password: password
    //     }, {
    //         headers: {
    //             'Authorization': token
    //         }
    //     })
    //         .then(response => {
    //             // console.log(response.data.data)
    //             return response
    //         })
    //         .then((response => {
    //             // userAuthen = response.data.data.isAuthen
    //             setfoundUser(response.data.data)
    //             console.log(foundUser)
    //             if (!response.data.success) {
    //                 Alert.alert('Booking failed','Please try again!', [
    //                     { text: 'Okay' }
    //                 ]);
    //                 return;
    //             }
    //             Alert.alert('Success','Your booking has been sent', [
    //                 { text: 'Okay' }
    //             ]);
    //         }))
    //         .catch(error => console.log(error));
    // }
    return (
        <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        parentCallback(time);
                    }}>
                    <Text>{time}</Text>
                </TouchableOpacity>
        </View>
    )
}

export default timeSlot

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 58,
        height: 30,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 5,
    }
})