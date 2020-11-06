import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native'
import { useStateValue } from '../../state';
import Colors from '../../style/Colors'

const HomeScreen = ({ navigation }) => {
  const [{ api }, dispatch] = useStateValue()
  {api.getFolderContents('/Photos', 0)}
  return (
    <Text>
      We did it!
    </Text>
  );
}

export default HomeScreen;