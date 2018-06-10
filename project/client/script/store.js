import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const middleware = [thunk];

if (module.hot) {
    middleware.push(createLogger({
        collapsed: true,
        level: 'info',
        predicate: (getState, action) => typeof action.type !== 'undefined',
    }));
}

export default createStore(reducers, applyMiddleware(...middleware));
