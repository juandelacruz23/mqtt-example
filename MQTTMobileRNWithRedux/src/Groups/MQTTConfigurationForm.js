import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeValue } from "./../redux/mainDuck";

const MQTTConfigurationForm = props => (
  <View>
    <View style={styles.horizontalContainer}>
      <TextInput
        label="Host"
        value={props.host}
        onChangeText={props.onChangeHost}
        style={[styles.input, { flex: 4 }]}
        keyboardType="numeric"
        disabled={props.disableInputs}
      />
      <TextInput
        label="Port"
        value={props.port}
        onChangeText={props.onChangePort}
        style={[styles.input, { flex: 2 }]}
        keyboardType="numeric"
        disabled={props.disableInputs}
      />
    </View>
    <TextInput
      autoCapitalize="none"
      label="Topic"
      value={props.topic}
      onChangeText={props.onChangeTopic}
      style={styles.input}
      disabled={props.disableInputs}
    />
  </View>
);

MQTTConfigurationForm.propTypes = {
  disableInputs: PropTypes.bool.isRequired,
  host: PropTypes.string.isRequired,
  onChangeHost: PropTypes.func.isRequired,
  onChangePort: PropTypes.func.isRequired,
  onChangeTopic: PropTypes.func.isRequired,
  port: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  horizontalContainer: {
    flexDirection: "row",
  },
});

const mapStateToProps = ({ host, port, topic }) => ({
  host,
  port,
  topic,
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
