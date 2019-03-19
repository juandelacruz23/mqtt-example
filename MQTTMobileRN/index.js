import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import { name as appName } from './app.json';

const Main = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
