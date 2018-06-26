import { combineReducers } from 'redux';
{{#if router}}
import { routerReducer } from 'react-router-redux';
{{/if}}

export default combineReducers({
    {{#if router}}
    routing: routerReducer,
    {{/if}}
});
