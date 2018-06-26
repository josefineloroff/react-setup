import { applyMiddleware, createStore } from 'redux';
{{#if router}}
import { routerMiddleware } from 'react-router-redux';
{{/if}}
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
{{#if router}}
import createHistory from 'history/createBrowserHistory';
{{/if}}
import reducers from './reducers';
{{#if router}}

const history = createHistory();
{{/if}}

const middleware = [thunk];

if (module.hot) {
    middleware.push(createLogger({
        collapsed: true,
        level: 'info',
        predicate: (getState, action) => typeof action.type !== 'undefined',
    }));
}
{{#if router}}

middleware.push(routerMiddleware(history));

export const browserHistory = history;
{{/if}}

export default createStore(reducers, applyMiddleware(...middleware));
