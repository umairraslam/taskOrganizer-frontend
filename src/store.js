import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from './reducers/index';

const store = createStore(rootReducer, compose(
	applyMiddleware(promise, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f))
    
export default store;