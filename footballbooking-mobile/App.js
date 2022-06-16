import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './components/context'

import Tabs from './navigation/tabs'
import RootStack from './navigation/rootStack';
import PitchDetail from './screens/PitchDetail';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser, password) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser.token);
      ////const userName = foundUser.username;
      // 4/ ~ code mẫu
      try {
        // await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.multiSet([['userToken', userToken], ['userId', String(foundUser.userId)], ['password', password]]);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      // dispatch({ type: 'LOGIN', id: userName, token: userToken });
      dispatch({ type: 'LOGIN', token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* <RootStack/> */}
        {loginState.userToken !== null ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#368340',

              }

            }}
          //initialRouteName={'Home'}
          >
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="PitchDetail" component={PitchDetail} options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{
              title: "CHỈNH SỬA THÔNG TIN", 
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
          </Stack.Navigator>
        )
          :
          <RootStack />
        }

      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
