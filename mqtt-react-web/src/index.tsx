import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { mergeStyles } from "office-ui-fabric-react";
import { Provider } from "react-redux";
import { store } from "./redux";

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#app)": {
      margin: 0,
      padding: 0,
    },
  },
});

function Main(): JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById("app"));
