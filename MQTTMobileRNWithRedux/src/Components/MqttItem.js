import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import PropTypes from "prop-types";

const MqttItem = ({ text }) => <Text style={style.text}>{text}</Text>;

MqttItem.propTypes = {
  text: PropTypes.string.isRequired,
};

const style = StyleSheet.create({
  text: {
    padding: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default MqttItem;
