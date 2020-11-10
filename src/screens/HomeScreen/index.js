import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStateValue } from '../../state';
import Colors from '../../style/Colors'
import PhotoTile from './components/PhotoTile';

const MARGIN = 2

const HomeScreen = ({ navigation }) => {
  const [{ api }, dispatch] = useStateValue()
  const [photos, setPhotos] = useState([])
  const [itemHeight, setItemHeight] = useState(100)
  
  const _loadPhotos = async () => {
    let photos = await api.getPhotos()
    setPhotos(photos)
  }

  const _renderPhoto = ({ item }) => {
    return (
      <PhotoTile 
        photo={item} 
        uri={api.serverUri}
        token={api.token}
      />
    )
  }
  const _onLayout = (e) => {
    const width = e.nativeEvent.layout.width
    setItemHeight(width / 2)
  }

  const _getItemLayout = (_, index) => {
    return { length: itemHeight, offset: itemHeight * index, index }
  }
  
  if (photos.length > 0) {
    return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
        <FlatList 
          onLayout={_onLayout}
          columnWrapperStyle={[
            {
              flex: 1,
              flexDirection: 'row',
              marginLeft: -MARGIN,
              marginRight: -MARGIN,
            },
            { height: itemHeight },
          ]}
          numColumns={2}
          data={photos}
          renderItem={_renderPhoto}
          keyExtractor={(item)=>item.id}
          getItemLayout={_getItemLayout}
        />
      </SafeAreaView>
    );
  } else {
    {_loadPhotos()}
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default HomeScreen;