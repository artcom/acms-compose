import Immutable from "immutable"
import mapValues from "lodash/mapValues"
import { routerReducer } from "react-router-redux"
import createLogger from "redux-logger"
import { applyMiddleware, createStore, combineReducers } from "redux"
import thunkMiddleware from "redux-thunk"

import * as reducers from "./reducers"

const loggerMiddleware = createLogger({
  stateTransformer: objectToJS,
  actionTransformer: objectToJS
})

export function configureStore() {
  return createStore(
    combineReducers(Object.assign({}, reducers, { routing: routerReducer })),
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}

function objectToJS(object) {
  return mapValues(object, (value) => {
    if (Immutable.Iterable.isIterable(value)) {
      return value.toJS()
    } else {
      return value
    }
  })
}
