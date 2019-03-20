# React Native with MQTT through web sockets
An example React Native app that shows how to connect to an MQTT server with webscockets using [react_native_mqtt](https://github.com/Introvertuous/react_native_mqtt).

## How to run it
Unfortunately, I haven't been able to test it in iOS so I cannot guarantee it works there. 

This project uses [react-native-config](https://github.com/luggit/react-native-config). So first create an .env file in the root directory and fill the following with your own values:
```
MQTT_HOST=<your-host>
MQTT_PORT=<the-port-you-are-using>
MQTT_CLIENT_ID=<unique-client-id>
```
Besides that, you should be able to follow the normal react native instructions to run it:
- Install dependencies with `yarn install`
- Run project with `react-native run-android`