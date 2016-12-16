import querystring from "querystring"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import { loadData } from "./actions/data"
import { updatePath } from "./actions/path"
import { configureStore } from "./store"

import Application from "./containers/application"
import Entity from "./containers/entity"
import EntityCreationModal from "./containers/entityCreationModal"
import EntityRenamingModal from "./containers/entityRenamingModal"

import "bootstrap/dist/css/bootstrap.min.css"

const params = querystring.parse(window.location.search.substring(1))

const store = configureStore()
store.dispatch(loadData(params.gitJsonApi))

window.addEventListener("hashchange", updatePathFromHash)
updatePathFromHash()

function updatePathFromHash() {
  store.dispatch(updatePath(window.location.hash))
}

render(
  <Provider store={ store } >
    <Application>
      <Entity />
      <EntityCreationModal />
      <EntityRenamingModal />
    </Application>
  </Provider>
, document.getElementById("app"))
