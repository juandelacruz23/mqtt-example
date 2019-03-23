import React from 'react';
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const MQTTConfigurationForm = props => (
      <View>
        <View style={styles.horizontalContainer}>
          <TextInput
            label='Host'
            value={props.host}
            onChangeText={props.onChangeHost}
            style={[styles.input, { flex: 4 }]}
            keyboardType="numeric"
            disabled={props.disableInputs}
          />
          <TextInput
            label='Port'
            value={props.port}
            onChangeText={props.onChangePort}
            style={[styles.input, { flex: 2 }]}
            keyboardType="numeric"
            disabled={props.disableInputs}
          />
        </View>
        <TextInput
          autoCapitalize='none'
          label='Topic'
          value={props.topic}
          onChangeText={props.onChangeTopic}
          style={styles.input}
          disabled={props.disableInputs}
        />
      </View>
    );

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  horizontalContainer: {
    flexDirection: 'row',
  }
});

export default MQTTConfigurationForm;