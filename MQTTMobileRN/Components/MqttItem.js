import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const MqttItem = ({ text }) => (<Text style={style.text}>{text}</Text>);

const style = StyleSheet.create({
  text: {
    padding: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

export default MqttItem;