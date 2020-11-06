import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginForm from './components/LoginForm'
import Webviewer from './components/Webviewer'
import Colors from '../../style/Colors'
import { useStateValue } from '../../state';
import * as Keychain from 'react-native-keychain';

const AuthScreen = ({ KEY }) => {
  const [{ api }, dispatch]= useStateValue()
  const [server, setServer] = useState()
  const [authFlow, setAuthFlow] = useState(false);
  
  const handleLogin = ({ serverAddress }) => {
    setServer(serverAddress);
    setAuthFlow(true);
  }
  
  const handleSuccess = async (settings) => {
    dispatch({
      type: 'setIsLoading',
      credentails: true
    })
    await AsyncStorage.setItem(KEY, settings.server)
    await Keychain.setInternetCredentials(
      settings.server,
      settings.user,
      settings.password
    )
    api.init(settings)
    dispatch({
      type: 'setIsLoading',
      credentails: false
    })
  }

  if (authFlow) {
    return (
      <ScrollView>
        <Webviewer server={server} 
                   setAuthFlow={setAuthFlow}
                   handleSuccess={handleSuccess}
                   />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.scrollView}>
        <LoginForm handleLogin ={handleLogin}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.NextcloudBlue,
    padding: 50
  },
});

export default AuthScreen;