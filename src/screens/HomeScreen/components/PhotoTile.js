import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhotoTile = ({ photo, uri, token, onPress }) => {
  let source = photo.isRemote 
    ? {
      uri: `${uri}${photo.path}` ,
      headers: { Authorization: `Basic ${token}` },
      priority: FastImage.priority.normal
    }
    : { 
      uri: photo.path,
      priority: FastImage.priority.normal
    }
  return (
      <View onPress={onPress} style={{         
        flex: 1,
        alignItems: 'stretch', 
      }}>
        <FastImage
          source={source}
          style={{ 
            flex: 1,
            width: null,
            height: null,
            margin: 2
          }}
        />
      </View>
  )
}

export default PhotoTile