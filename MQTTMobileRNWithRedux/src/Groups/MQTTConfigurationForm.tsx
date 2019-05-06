import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { changeValue, AppAction } from "./../redux/mainDuck";
import { connectionStatuses } from "../statuses";

const MQTTConfigurationForm: React.FC<Props> = props => (
  <View>
    <View style={horizontalContainer}>
      <TextInput
        label="Host"
        value={props.host}
        onChangeText={props.onChangeHost}
        style={[input, { flex: 4 }]}
        keyboardType="numeric"
        disabled={props.disableInputs}
      />
      <TextInput
        label="Port"
        value={props.port}
        onChangeText={props.onChangePort}
        style={[input, { flex: 2 }]}
        keyboardType="numeric"
        disabled={props.disableInputs}
      />
    </View>
    <TextInput
      autoCapitalize="none"
      label="Topic"
      value={props.topic}
      onChangeText={props.onChangeTopic}
      style={input}
      disabled={props.disableInputs}
    />
  </View>
);

interface Props {
  disableInputs: boolean,
  host: string,
  onChangeHost: () => AppAction,
  onChangePort: () => AppAction,
  onChangeTopic: () => AppAction,
  port: string,
  topic: string,
};

const input = {
  marginHorizontal: 24,
  marginTop: 24,
};
const horizontalContainer: StyleProp<ViewStyle> = {
  flexDirection: "row",
};

const mapStateToProps = ({ host, port, topic, connectionStatus }) => ({
  host,
  port,
  topic,
  disableInputs: connectionStatus === connectionStatuses.CONNECTED,
});

const mapDispatchToProps = {
  onChangeHost: value => changeValue({ host: value }),
  onChangePort: value => changeValue({ port: value }),
  onChangeTopic: value => changeValue({ topic: value }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MQTTConfigurationForm);
