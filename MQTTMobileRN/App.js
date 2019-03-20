import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage, FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import MqttItem from './Components/MqttItem';
import ConnectionFAB from './Components/ConnectionFAB';
import statuses from './statuses';

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

    this.client = new Paho.MQTT.Client('192.168.1.131', 5000, 'uname');
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect({ onSuccess: this.onConnect, useSSL: false })

    this.state = {
      text: ['...'],
      status: statuses.DISCONNECTED,
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onClickFAB = () => {
    const { status } = this.state;
    const { client } = this;
    if(status === statuses.CONNECTED) {
      client.unsubscribe('message', { onSuccess: () => this.setStatus(statuses.DISCONNECTED) });
    }
    else {
      client.subscribe('message', { onSuccess: () => this.setStatus(statuses.CONNECTED) });
    }
  };

  setStatus = status => {
    this.setState({ status });
  };

  onConnect = () => this.pushText('Connected');  

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const { status, text } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={text}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item${index}`}
          renderItem={({ item }) => <MqttItem text={item} />}
          style={styles.container}
        />
        <ConnectionFAB
          status={status}
          onClick={this.onClickFAB}
        />
      </View>
    );
  }
}
