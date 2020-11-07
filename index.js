/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import CloudPhotos from './src/CloudPhotos'
import { StateProvider } from './src/state'
import API from './src/API'


const KEY = "@NEXTCLOUD_SERVER_URI"
const api = new API();

const App = () => {
  const initialState = {
    KEY: KEY,
    credentials: null,
    api: api,
    isLoading: true,
    lastResponse: null
  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'saveCredentials':
        return {
          ...state,
          credentials: action.credentials
        };
      case 'setIsLoading':
        return {
          ...state,
          isLoading: action.isLoading
        }
      case 'setLastResponse':
        return {
          ...state,
          lastResponse: action.lastResponse
        }
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <CloudPhotos />
    </StateProvider>
  )
}  
AppRegistry.registerComponent(appName, () => App);
