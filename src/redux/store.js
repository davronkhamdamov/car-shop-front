import { createStore } from "redux";
import { dataReduser } from './reduser.js'
const store = createStore(
    dataReduser,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };