import querystring from "querystring"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { IndexRoute, Router, Route, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"

import { loadData } from "./actions"
import { configureStore } from "./store"

import Application from "./containers/application"
import EntityList from "./containers/entityList"

const params = querystring.parse(window.location.search.substring(1))

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(loadData(params.gitJsonApi))

render(
  <Provider store={ store } >
    <Router history={ history } >
      <Route path="/" component={ Application }>
        <IndexRoute component={ EntityList } />
      </Route>
    </Router>
  </Provider>
, document.getElementById("app"))
