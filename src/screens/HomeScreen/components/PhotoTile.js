import React from 'react';
import FastImage from 'react-native-fast-image'
import { View } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhotoTile = ({ photo, uri, token, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <FastImage
                style={{ width: 200, height: 200 }}
                source={{
                    uri: `${uri}${photo.path}`,
                    headers: { Authorization: `Basic ${token}` },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </TouchableOpacity>
    )
}

export default PhotoTile