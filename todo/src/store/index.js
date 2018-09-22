import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import tasksReducer from '../reducers/tasks';

import thunk from 'redux-thunk';

import logger from 'redux-logger';
// 自作logger
/*
const logger = store => next => action => {
  // Action適用前のstateを表示
  console.log(store.getState());
  
  // どのようなActionが適用されたのか表示
  console.log(action);
  
  // Actionの適用
  const result = next(action);
  
  // Action適用後のstateを表示
  console.log(store.getState());
  console.log("---------------");
  
  // 特別なreturnをする必要は無いのでresultをそのまま返す
  return result;
}
*/

// localStorage
const storageMiddleware = store => next => action => {
  const result = next(action);
  window.localStorage.setItem('app-state', JSON.stringify(store.getState()));
  return result;
}

const reducer = combineReducers({
  // tasksReducerをtasksというkeyに割り当てる
  tasks: tasksReducer,
  // react-router-reduxのReducer
  router: routerReducer,
});

const savedState = JSON.parse(localStorage.getItem('app-state'));

// historyは[src/index.js]から渡すようにする
export default function createStore(history) {
  return reduxCreateStore(
    reducer,
    savedState ? savedState : reducer(undefined, {type: 'INIT'}),
    applyMiddleware(
      // react-router-reduxのRedux Middleware
      routerMiddleware(history),
      // redux-logger
      logger,
      thunk,
      // localStorage
      storageMiddleware
    )
  );
}