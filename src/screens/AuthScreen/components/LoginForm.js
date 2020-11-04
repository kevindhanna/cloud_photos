import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StatusBar
} from 'react-native';
import React from 'react';
import { Webview } from 'react-native-webview'
import { useForm, Controller } from "react-hook-form";
import Colors from '../../../style/Colors';

const LoginForm = ({ handleLogin }) => {
  const { control, handleSubmit, errors } = useForm();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={"https://my.cloud.server"}
          />
        )}
        name="serverAddress"
        rules={{ required: true }}
      />
      {errors.serverAddress && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(handleLogin)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderStyle: "solid",
    borderColor: Colors.dark,
    height: 40,
    paddingLeft: 6
  }
});

export default LoginForm
