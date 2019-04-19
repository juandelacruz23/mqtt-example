import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./src/App";
import { name as appName } from "./app.json";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux";

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
