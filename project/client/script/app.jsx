import React from 'react';
import ReactDOM from 'react-dom';
{{#redux}}
import { Provider } from 'react-redux';
{{/redux}}
import 'polyfills';
{{#redux}}
import store, { browserHistory } from './store';
{{/redux}}
import App from './components/App';
import '../style/app.sass';

const render = (AppComponent) => {
    ReactDOM.render(
        {{#redux}}
        <Provider store={store}>
            <AppComponent />
        </Provider>,
        {{/redux}}
        {{^redux}}
        <AppComponent />,
        {{/redux}}
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}
