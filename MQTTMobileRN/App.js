import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, FlatList, StyleSheet, } from 'react-native';
import { Divider } from 'react-native-paper';
import MqttItem from './Components/MqttItem';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('192.168.1.68', 5000, 'uname');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({ onSuccess: this.onConnect, useSSL: false });

    this.state = {
      text: ['...'],
      client,
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('message');
    this.pushText('connected');
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const { text } = this.state;
    return (
      <FlatList
        data={text}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, index) => `item${index}`}
        renderItem={({ item }) => <MqttItem text={item} />}
        style={styles.container} 
      />
    );
  }
}
