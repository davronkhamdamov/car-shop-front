import { configureStore } from "@reduxjs/toolkit";
import { root } from "./root";

const store = configureStore({
    reducer: root
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };