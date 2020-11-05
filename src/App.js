import React from "react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./state/store";

import AppRouter from "./routes";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
