import { createActions } from 'redux-actions';
import { START, ERROR, FULFILLED } from './constants';

function createAsyncActions(actions) {
    const baseActions = createActions(...actions);
    const extraAsyncActions = {};
    for (let key of Object.keys(baseActions)) {
        const baseActionFunc = baseActions[key];
        const funcIdentity = baseActionFunc.toString();
       
        // For each created function, we create 3 functions: Start, Error & Fulfilled.
        extraAsyncActions[key] = _identityWithAsyncMeta(baseActionFunc, START);
        extraAsyncActions[funcError(key)] = _asyncAction(funcIdentity, ERROR);
        extraAsyncActions[funcFulfilled(key)] = _asyncAction(funcIdentity, FULFILLED);
    }
    return extraAsyncActions;
}

function _identityWithAsyncMeta(func, asyncValue) {
    return (payload, meta) => {
        const asyncAction = func(payload, meta);
        if (!asyncAction.meta) {
            asyncAction.meta = {};
        }
        asyncAction.meta = {...asyncAction.meta, ...meta};
        asyncAction.meta.async = asyncValue;

        return asyncAction;
    };
}

function _asyncAction(actionType, asyncValue) {
    return (payload, meta = {}) => {
        const newAction = {
            type: actionType,
            payload,
            meta: {
                async: asyncValue,
                ...meta,
            }
        };

        if (asyncValue === ERROR) {
            newAction['error'] = true;
        }
        return newAction;
    };
}

function funcError(func) {
    return `${func}Error`;
}

function funcFulfilled(func) {
    return `${func}Fulfilled`;
}

export const isStart = action => action.meta ? action.meta.async === START : false;

export const isFulfilled = action => action.meta ? action.meta.async === FULFILLED : false;

export default createAsyncActions;