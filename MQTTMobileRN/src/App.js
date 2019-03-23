import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import MqttItem from './Components/MqttItem';
import { connectionStatuses } from './statuses';
import MQTTComponent from './Headless/MQTTComponent';
import MQTTConfigurationForm from './Groups/MQTTConfigurationForm';
import MQTTConfigurationButtons from './Groups/MQTTConfigurationButtons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ['...'],
      connectionStatus: connectionStatuses.DISCONNECTED,
      host: '',
      port: '',
      topic: '',
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onClickConnectionButton = () => {
    const { connectionStatus } = this.state;
    if(connectionStatus === connectionStatuses.CONNECTED) this.setStatus(connectionStatuses.DISCONNECTED);
    else this.setStatus(connectionStatuses.CONNECTED)
  };

  setStatus = connectionStatus => {
    this.setState({ connectionStatus });
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

  onChange = value => this.setState(value);

  onSubscribe = () => this.pushText('SUBSCRIBED');

  render() {
    const { 
      connectionStatus,
      text,
      host,
      port,
      topic,
    } = this.state;
    const isFilled = host && port && topic;
    return (
      <View style={styles.container}>
        <MQTTConfigurationForm
          host={host}
          port={port}
          topic={topic}
          onChangeHost={host => this.onChange({ host })}
          onChangePort={port => this.onChange({ port })}
          onChangeTopic={topic => this.onChange({ topic })}
        />
        <MQTTConfigurationButtons
          isFormFilled={isFilled}
          onPressConnectionButton={this.onClickConnectionButton}
          connectionStatus={connectionStatus}
        />
        <FlatList
          data={text}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item${index}`}
          renderItem={({ item }) => <MqttItem text={item} />}
          style={styles.container}
        />
        { connectionStatus === connectionStatuses.CONNECTED && 
        <MQTTComponent 
          onConnect={this.onConnect}
          onConnectionLost={this.onConnectionLost}
          onMessageArrived={this.onMessageArrived}
          onSubscribe={this.onSubscribe}
          host={host}
          port={port}
          topic={topic}
        />}
      </View>
    );
  }
}
