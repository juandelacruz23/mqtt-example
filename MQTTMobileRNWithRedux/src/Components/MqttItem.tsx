import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  text: string,
}

const style: StyleProp<TextStyle> = {
  padding: 20,
  textAlign: "center",
  textAlignVertical: "center",
};

const MqttItem: React.FC<Props> = ({ text }) => <Text style={style}>{text}</Text>;

export default MqttItem;
