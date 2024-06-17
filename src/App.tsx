import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "./components/Layout";
import { persistor, store } from "./redux/store";
import PageRoutes from "./routes/PageRoutes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Toaster />

          <Layout>
            <PageRoutes />
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
