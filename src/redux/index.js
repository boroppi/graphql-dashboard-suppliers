import { createStore, compose } from "redux";
import allReducer from "./reducers/index";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const store = createStore(allReducer,composeEnhancers());
    return store;
}