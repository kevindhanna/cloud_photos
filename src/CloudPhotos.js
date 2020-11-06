import React from 'react';
import { AppState, ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen';
import { useStateValue } from './state';

const Stack = createStackNavigator();

const App = () => {
  const appState = AppState.currentState;
  const [{ isLoading, KEY, api }, dispatch] =  useStateValue()

  const init = async () => {
    const server = await AsyncStorage.getItem(KEY)
    if (server) {
      const hasCredentials = await Keychain.hasInternetCredentials(server)
      if (hasCredentials) {
        let creds = await Keychain.getInternetCredentials(server)
        api.init(creds)
      } 
    }
    dispatch({
      type: 'setIsLoading',
      credentails: false
    })
  }
  
  if (isLoading) {
    {init()}
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (api.isInitialised()) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <AuthScreen KEY={KEY} />
    )
  }
}

export default App
