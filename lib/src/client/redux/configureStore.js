import {createStore, combineReducers, applyMiddleware} from 'redux';
import messageReducer from './message/messageReducer';
import thunk from 'redux-thunk';

export function configureStore() {
    return createStore(
        combineReducers({
            messageReducer
        }),
        applyMiddleware(
            thunk
        )
    );
}
