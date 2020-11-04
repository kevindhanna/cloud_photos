import React from 'react';
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './src/screens/AuthScreen'
import API from './src/API'
import * as Keychain from 'react-native-keychain';
import HomeScreen from './src/screens/HomeScreen';
import { StateProvider } from './src/state'

const KEY = "@NEXTCLOUD_SERVER_URI"
const Stack = createStackNavigator();
const api = new API();

const App = () => {
  const appState = AppState.currentState;
  const server = (async () => {await AsyncStorage.getItem(KEY)})()
  if (server) {
    const hasCredentials = await Keychain.hasInternetCredentials(server)
    if (hasCredentials) {
      const credentials = await Keychain.getInternetCredentials(server)
    }
  }
  const initialState = {
    credentials: credentials,
    api: api
  }
  console.log(server, hasCredentials, initialState)
  const reducer = (state, action) => {
    switch (action.type) {
      case 'saveCredentials':
        return {
          ...state,
          credentials: action.credentials
        };
        
      default:
        return state;
    }
  };

  const renderDefault = () => {
    if (hasCredentials) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ api: api }}
            />
        </Stack.Navigator>
      )
    } else {
      return (
        <AuthScreen KEY={KEY}/>
      )
    }
  }
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        {renderDefault()}
      </NavigationContainer>
    </StateProvider>
  )
}

export default App
