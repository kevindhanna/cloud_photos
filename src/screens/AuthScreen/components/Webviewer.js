import React, { useState } from 'react'
import {
  StyleSheet,
  Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview'
import Colors from '../../../style/Colors'

const Webviewer = ({ server, setAuthFlow, handleSuccess }) => {
  const _handleOpenURL = (event) => {
    if (/^nc:\/\/login/.test(event.url)) {
      setAuthFlow(false)
      const matches = event.url.match(/(server|user|password):([^&]+)/g)
      if (matches) {
        let credentials = {};
        matches.map((match) => {
          let [key, value] = match.split(/:(.+)/)
          credentials[key] = value;
        });
        handleSuccess(credentials)
      }
      return false
    } else {
      return true
    }
  }
  return (
      <WebView
        source={{
          uri: server + "/index.php/login/flow",
          headers: {
            "OCS-APIRequest": "true",
            "User-Agent": "Cloud Photos"
          }
        }}
        onShouldStartLoadWithRequest={(event) => {
          bool = _handleOpenURL(event)
          console.log("1", bool)
          return bool
        }}
        onNavigationStateChange={(event) => {
          bool = _handleOpenURL(event)
          console.log("2", bool)
          return bool
        }}
        automaticallyAdjustContentInsets
        onError={(err) => { console.log('onError', err) }}
        renderError={(err) => { console.log('renderError', err) }}
        style={ styles.webView }
        cacheEnabled={false}
      />
  )
}

export default Webviewer

const styles = StyleSheet.create({
  webView: {
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    minHeight: Dimensions.get('screen').height,
  }
})
