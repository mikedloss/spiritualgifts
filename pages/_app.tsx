import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, Persistor } from "redux-persist";

import Container from "../src/components/Container";
import configureStore from "../src/store";

import "../src/assets/tailwind.css";

export const PersistorContext = React.createContext<Persistor>(null);

const App = ({ Component, pageProps, store }) => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <Container>
            <small>Loading things...</small>
          </Container>
        }
      >
        <PersistorContext.Provider value={persistor}>
          <Component {...pageProps} />
        </PersistorContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default withRedux(configureStore)(App);
