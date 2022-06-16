import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

import { Home } from "../screens"
import { History } from "../screens"
import { Profile } from "../screens"

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

  var isSelected = accessibilityState.selected

  if (isSelected) {
      return (
          <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                  <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                  <Svg
                      width={75}
                      height={61}
                      viewBox="0 0 75 61"
                  >
                      <Path
                          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                          fill={'white'}
                      />
                  </Svg>
                  <View style={{ flex: 1, backgroundColor: 'white' }}></View>
              </View>

              <TouchableOpacity
                  style={{
                      top: -22.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: 'white'
                  }}
                  onPress={onPress}
              >
                  {children}
              </TouchableOpacity>
          </View>
      )
  } else {
      return (
          <TouchableOpacity
              style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: 'white'
              }}
              activeOpacity={1}
              onPress={onPress}
          >
              {children}
          </TouchableOpacity>
      )
  }
}

const Tabs = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#368340',
            tabBarShowLabel: false,
            tabBarStyle: { 
              position: 'absolute',
              backgroundColor: 'transparent',
              elevation: 0, 
            },
            
          }}
        
        >
          <Tab.Screen
            name="HomeTab"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => <FontAwesome5 name="binoculars" size={30} color={color} />,
              tabBarButton: (props) => (
                  <TabBarCustomButton
                      {...props}
                  />
              )
            }} />
          <Tab.Screen
            name="HistoryTab"
            component={History}
            options={{
              tabBarLabel: 'History',
              tabBarIcon: ({color}) => <Fontisto name="bookmark-alt" size={30} color={color} />,
              tabBarButton: (props) => (
                  <TabBarCustomButton
                      {...props}
                  />
              )
            }} />
          <Tab.Screen
            name="ProfileTab"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color}) => <Ionicons name="person-circle" size={30} color={color} />,
              tabBarButton: (props) => (
                  <TabBarCustomButton
                      {...props}
                  />
              )
            }} />
        </Tab.Navigator>
      );
}

export default Tabs