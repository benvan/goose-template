import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {middleware as asynchMiddleware} from 'redux-asynch-middleware'
import createSagaMiddleware from 'redux-saga'
import {bindGooseToSagaMiddleware,loadModule,gooseMiddleware} from '@clarify/goose-module'
import RootModule from './modules/root'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


function configureStore(initialState,history) {
  const sagaMiddleware = createSagaMiddleware()


  const store = createStore(
    x => x, // We'll replace this (no-op) reducer in a moment
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        asynchMiddleware,
        sagaMiddleware,
        gooseMiddleware
      )
    )

  );

  // Bind goose and kick off the root module
  bindGooseToSagaMiddleware(
    sagaMiddleware,
    // Allows you to specify how the new reducer gets assigned to the store.
    // If we wanted to transform the new (combined) reducer before the store receives it, this would be the place to do so.
    (newReducer) => store.replaceReducer(newReducer)
  )
  store.dispatch(loadModule(RootModule))

  return store;
}

export default configureStore
