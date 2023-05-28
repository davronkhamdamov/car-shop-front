import React from "react";
import { RouterProvider } from "react-router-dom";
import rout from "./Router.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={rout} />
    </Provider>
  );
};

export default App;
