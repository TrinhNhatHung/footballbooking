import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { apiURL } from '../api/config';
import HistoryItem from '../components/historyItem';

const History = (navigation) => {
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
                const bookingAccept = res.data.data.filter(e => e.status !== 'Chờ xác nhận').map(e => e.bookingId)
                // console.log(bookingAccept)
                const newBooking = res.data.data.filter(e => (bookingAccept.includes(e.bookingId) && e.status !== 'Chờ xác nhận') || !bookingAccept.includes(e.bookingId))
                // console.log("===============================")
                // console.log(newBooking)
                
                setMyBooking({
                    loading: false,
                    data: newBooking.reverse(),
                })
                // console.log(res.data.data)
            })
            .catch(error => {
                setMyBooking(JSON.stringify(error.message))
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
        marginBottom: 50,
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