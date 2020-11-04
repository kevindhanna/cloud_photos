import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginForm from './components/LoginForm'
import Webviewer from './components/Webviewer'
import Colors from '../../style/Colors'
import { useStateValue } from '../../state';
import * as Keychain from 'react-native-keychain';

const AuthScreen = ({ KEY }) => {
  const [{ api }, dispatch]= useStateValue();
  console.log(thing)
  const [server, setServer] = useState();
  const [authFlow, setAuthFlow] = useState(false);
  
  const handleLogin = ({ serverAddress }) => {
    setServer(serverAddress);
    setAuthFlow(true);
  }
  
  const handleSuccess = (settings) => {
    AsyncStorage.setItem(KEY, settings.server)
    Keychain.setInternetCredentials(
      credentials.server,
      credentials.username,
      credentials.password
    )
    api.init(settings)
    dispatch({
      type: "saveCredentials",
      credentials: settings
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