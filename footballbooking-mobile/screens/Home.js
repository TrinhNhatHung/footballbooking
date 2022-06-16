import { StyleSheet, Text, View, ScrollView, Platform, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import PitchItem from '../components/pitchItem';
import Search from '../components/search';
import pitchItem from '../components/pitchItem';
import { apiURL } from '../api/config';




const Home = ({ navigation }) => {
  // const apiURL = 'http://localhost:8080/pitchservice/pitchs';
  // const apiURL = 'http://192.168.1.5:8080/pitchservice/pitchs';

  const [pitchs, setpitchs] = useState({
    loading: true,
    data: [],
  });

  const [searchPitchs, setSearchPitchs] = useState({
    searching: false,
    data: [],
  });

  const [searchText, setSearchText] = useState('')
  // const [pitchTypeChecked, setpitchTypeChecked] = React.useState([
  //   { id: 1, pitchType: 'Sân 5', isChecked: false },
  //   { id: 2, pitchType: 'Sân 7', isChecked: false },
  //   { id: 3, pitchType: 'Sân 11', isChecked: false },
  // ]);

  // const [zoneChecked, setZoneChecked] = React.useState([
  //   { id: 1, zone: 'Hải Châu', isChecked: false },
  //   { id: 2, zone: 'Cẩm Lệ', isChecked: false },
  //   { id: 3, zone: 'Thanh Khê', isChecked: false },
  //   { id: 4, zone: 'Liên Chiểu', isChecked: false },
  //   { id: 5, zone: 'Ngũ Hành Sơn', isChecked: false },
  //   { id: 6, zone: 'Sơn Trà', isChecked: false },
  //   { id: 7, zone: 'Hòa Vang', isChecked: false },
  //   { id: 8, zone: 'Hoàng Sa', isChecked: false },
  // ]);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getListPitch();

    return () => {

    }
  }, [])

  const getListPitch = async () => {
    try {
      setpitchs({
        loading: true,
        // data: [],
      })
      setSearchPitchs({
        // data: newData,
        searching: false
      });
      const res = await axios.get(`${apiURL}pitchservice/pitchs`,
        {
          headers: {
            // 'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      setpitchs({
        loading: false,
        data: res.data.data,
      })
      // console.log(res.data.data)
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
      setMyBooking(JSON.stringify(error.message))
    }
  }

  // const searchFilterFunction = (text) => {
  //   const newData = pitchs.data.filter(item => {
  //     const itemData = `${item.name.toUpperCase()} ${item.address.number.toUpperCase()} ${item.address.street.toUpperCase()} ${item.address.commune.toUpperCase()} ${item.address.district.toUpperCase()} ${item.address.city.toUpperCase()}`;
  //    // const textData = text.toUpperCase();

  //     return itemData.indexOf(text.toUpperCase()) > -1;
  //   });
  //   setSearchPitchs({ 
  //     data: newData,
  //     searching: true
  //   });
  //   console.log(newData + "..." +text)
  // }

  const getSearchText = (text) => {
    setSearchText(text)
  }

  const getSearchFilter = (zone, pitchType) => {
    setZoneChecked(zone)
    setpitchTypeChecked(pitchType)
  }

  const searchFilterFunction = () =>
  (pitchs.data.filter(item => {
    const itemData = `${item.name.toUpperCase()} ${item.address.number.toUpperCase()} ${item.address.street.toUpperCase()} ${item.address.commune.toUpperCase()} ${item.address.district.toUpperCase()} ${item.address.city.toUpperCase()}`;
    // const textData = text.toUpperCase();
    const zone = zoneChecked.map(zone => {
      if (zone.isChecked) return zone.zone
      else return 0
    })
    // console.log(zone)
    const pitchType = pitchTypeChecked.map(pitchType => {
      if (pitchType.isChecked) return pitchType.pitchType
      else return 0
    })
    console.log(pitchType)
    const pitchTypeData = item.detail.map(detail => {
      return detail.pitchTypeName
    })
    
    if(pitchType.some(p=>(p!=0))&&zone.some(z=>(z!=0))) return (itemData.indexOf(searchText.toUpperCase()) > -1 && zone.indexOf(item.address.district) > -1 && pitchType.some(x => pitchTypeData.indexOf(x) > -1))
    else if (pitchType.some(p=>(p!=0))) return (itemData.indexOf(searchText.toUpperCase()) > -1 && pitchType.some(x => pitchTypeData.indexOf(x) > -1))
    else if (zone.some(z=>(z!=0))) return (itemData.indexOf(searchText.toUpperCase()) > -1 && zone.indexOf(item.address.district) > -1)
    else return (itemData.indexOf(searchText.toUpperCase()) > -1)
  }))

  // getListPitch = () => {
  //   fetch(apiURL)
  //     .then((res) => res.json())
  //     .then((resJson) => {
  //       setpitchs(resJson.data)
  //       // console.log(pitchs)
  //     }).catch((error) => {
  //       console.log('Error: ', error);
  //     }).finally(() => setisLoading(false))
  // }

  if (pitchs.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" animating color={'green'} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#368340'></StatusBar>
        <View style={styles.headerContainer}>
          <Search getSearchText={getSearchText} getSearchFilter={getSearchFilter} pitchs={pitchs}></Search>
        </View>


        <View style={{
          marginTop: 10,
          marginLeft: 10,
        }}>
          <Text style={styles.result}>Tất cả sân</Text>
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
          // data={searchPitchs.searching ? searchPitchs.data : pitchs.data}
          data={searchFilterFunction()}
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