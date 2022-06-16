import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryItem from '../components/historyItem'
import { apiURL } from '../api/config';
import { AuthContext } from '../components/context';

const History = (navigation) => {
    // const apiURL = 'http://192.168.1.5:8080/';
    const { signOut } = React.useContext(AuthContext);

    const [userToken, setUserToken] = useState('')
    const [myBooking, setMyBooking] = useState({
        loading: true,
        data: [],
    })

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            setUserToken({ userToken: token })
            if (token !== null) {
                // value previously stored
            }
            console.log(token);
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getData();
        // callMyBooking();
    }, [])

    useEffect(() => {
        callMyBooking(userToken.userToken);
    }, [userToken])

    // const callMyBooking = async (token) => {
    //     try {
    //         setMyBooking({
    //             loading: true,
    //             // data: [],
    //         })
    //         const res = await axios.get(`${apiURL}bookingservice/getMyBooking`,
    //             {
    //                 headers: {
    //                     'Authorization': token,
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //         setMyBooking({
    //             loading: false,
    //             data: res.data.data,
    //         })
    //         console.log(res.data.data)

    //         // setIsLoadingFreeTime({ isLoadingFreeTime: false })
    //         // arrayA = res.data.data
    //         // arrayTemp = [0]
    //         // arrayA.forEach(function (element) {
    //         //   if (element.hasPitch == true) {
    //         //     // arrayTemp = arrayTemp.push(element.timeStart)
    //         //     // setArrayFreeTime(arrayTemp)
    //         //     console.log(element.timeStart)
    //         //   }
    //         //   // console.log(element.timeStart)
    //         // });
    //         // console.log(arrayA)
    //         // console.log(arrayTemp)
    //         // console.log(res.data.data)
    //     } catch (error) {
    //         setMyBooking(JSON.stringify(error.message))
    //         console.log(JSON.stringify(error.message))
    //         if (JSON.stringify(error.message).indexOf("403") > -1) {
    //             signOut()
    //         }
    //     }
    // }
    const callMyBooking = (token) => {
        setMyBooking({
            loading: true,
            // data: [],
        })
        axios.get(`${apiURL}bookingservice/getMyBooking`,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // console.log(response.data.data)
                setMyBooking({
                    loading: false,
                    data: res.data.data,
                })
                console.log(res.data.data)
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
            .catch(error => {
                setMyBooking(JSON.stringify(error.message))
                // console.log(JSON.stringify(error.message))
                // if (JSON.stringify(error.message).indexOf("403") > -1) {
                //     signOut()
                // }
            })
    }

    if (myBooking.loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" animating color={'green'} />
            </SafeAreaView>
        )
    } else {
        return (

            <SafeAreaView style={styles.container}>
                {/* <StatusBar backgroundColor=''></StatusBar> */}
                <View style={styles.headerContainer}>
                    <Text style={{
                        textTransform: 'uppercase',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                    }}>Danh sách đặt sân</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={myBooking.data}
                    renderItem={({ item }) => <HistoryItem pitch={item} token={userToken} />}
                    keyExtractor={(item) => item.bookingId}
                    refreshControl={
                        <RefreshControl
                            refreshing={myBooking.loading}
                            onRefresh={() => callMyBooking(userToken.userToken)}
                        />
                    }
                />
            </SafeAreaView>

        )
    }
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    headerContainer: {
        height: 60,
        backgroundColor: '#368340',
        // marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: 16
    },
})