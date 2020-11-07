import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStateValue } from '../../state';
import Colors from '../../style/Colors'
import PhotoTile from './components/PhotoTile';

const HomeScreen = ({ navigation }) => {
  const [{ api }, dispatch] = useStateValue()
  const [photos, setPhotos] = useState([])
  
  const loadPhotos = async () => {
    let photos = await api.getPhotos()
    setPhotos(photos)
  }

  const renderPhoto = ({ item }) => {
    return (
      <PhotoTile 
        photo={item} 
        uri={api.serverUri}
        token={api.token}
        key={item.eTag}
      />
    )
  }

  if (photos.length > 0) {
    return (
      <SafeAreaView>
        <FlatList 
          numColumns={2}
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={(item)=>item.eTag}
        />
      </SafeAreaView>
    );
  } else {
    {loadPhotos()}
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default HomeScreen;