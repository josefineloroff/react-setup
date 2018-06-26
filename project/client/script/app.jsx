import React from 'react';
import ReactDOM from 'react-dom';
{{#if redux}}
import { Provider } from 'react-redux';
{{/if}}
{{#if router}}
import { Router } from 'react-router-dom';
{{/if}}
import 'polyfills';
{{#if redux}}
{{#if router}}
import store, { browserHistory } from './store';
{{else}}
import store from './store';
{{/if}}
{{/if}}
import App from './components/App';
import '../style/app.sass';

const render = (AppComponent) => {
    ReactDOM.render(
        {{#if redux}}
        {{#if router}}
        <Router history={browserHistory}>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </Router>,
        {{else}}
        <Provider store={store}>
            <AppComponent />
        </Provider>,
        {{/if}}
        {{else}}
        <AppComponent />,
        {{/if}}
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}
