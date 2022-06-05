import { StyleSheet, Text, View, ScrollView, Platform, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import PitchItem from '../components/pitchItem';
import Search from '../components/search';
import pitchItem from '../components/pitchItem';





const Home = ({ navigation }) => {
  // const apiURL = 'http://localhost:8080/pitchservice/pitchs';
  const apiURL = 'http://192.168.1.5:8080/pitchservice/pitchs';

  const [pitchs, setpitchs] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getListPitch();

    return () => {

    }
  }, [])


  getListPitch = () => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setpitchs(resJson.data)
        console.log(pitchs)
      }).catch((error) => {
        console.log('Error: ', error);
      }).finally(() => setisLoading(false))
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" animating color={'green'}/>
      </View>
    );
  } else{
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#368340'></StatusBar>
        <View style={styles.headerContainer}>
          <Search></Search>
        </View>
  
  
        <View style={{
          marginTop: 10,
          marginLeft: 10,
        }}>
          <Text style={styles.result}>Kết quả</Text>
        </View>
        {/* <View style={styles.listContainer}>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
            <PitchItem navigation={navigation}></PitchItem>
          </View> */}
        {/* {isLoading ? <ActivityIndicator /> : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={pitchs}
            renderItem={({ item }) => <PitchItem pitch={item} navigation={navigation} />}
            keyExtractor={(item) => item.pitchId}
          />
        )} */}
        <FlatList
            contentContainerStyle={styles.listContainer}
            data={pitchs}
            renderItem={({ item }) => <PitchItem pitch={item} navigation={navigation} />}
            keyExtractor={(item) => item.pitchId}
          />
      </View>
    )

  }
}

export default Home

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
})