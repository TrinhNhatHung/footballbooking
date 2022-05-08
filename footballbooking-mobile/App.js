import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';


import Tabs from './navigation/tabs'
import RootStack from './navigation/rootStack';
import PitchDetail from './screens/PitchDetail';


const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
    <NavigationContainer>
      {/* <RootStack/> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { 
            backgroundColor: '#368340',
            
           }
          
        }}
        //initialRouteName={'Home'}
      >
        <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="PitchDetail" component={PitchDetail} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
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
