import Immutable from "immutable"
import mapValues from "lodash/mapValues"
import { createLogger } from "redux-logger"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"

import * as reducers from "./reducers"

const loggerMiddleware = createLogger({
  stateTransformer: objectToJS,
  actionTransformer: objectToJS
})

export function configureStore() {
  return createStore(
    combineReducers(reducers),
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
