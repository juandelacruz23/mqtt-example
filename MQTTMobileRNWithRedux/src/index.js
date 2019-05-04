import React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./redux";

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default Main;
