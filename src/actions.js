import axios from "axios"

import { toPath } from "./hash"
import { getNewEntityPath, getNewEntityValues, getTemplateChildren } from "./selectors"

export function loadData(url, version = "master") {
  return async function(dispatch) {
    const response = await axios.get(version, { baseURL: url })
    dispatch(updateData(response.data, response.headers.etag))
  }
}

function updateData(data, version) {
  return {
    type: "UPDATE_DATA",
    payload: {
      config: data.config,
      content: data.content,
      templates: data.templates,
      version
    }
  }
}

export function updatePath(hash) {
  return {
    type: "UPDATE_PATH",
    payload: {
      path: toPath(hash)
    }
  }
}

export function changeValue(path, value) {
  return {
    type: "CHANGE_VALUE",
    payload: {
      path,
      value
    }
  }
}

export function undoChanges(path) {
  return (dispatch, getState) => {
    const originalValue = getState().originalContent.getIn(path)

    dispatch({
      type: "UNDO_CHANGES",
      payload: {
        path,
        originalValue
      }
    })
  }
}

export function startEntityCreation() {
  return (dispatch, getState) => {
    const state = getState()
    const templates = getTemplateChildren(state)

    dispatch({
      type: "START_ENTITY_CREATION",
      payload: {
        name: "",
        template: templates[0],
        templates
      }
    })
  }
}

export function updateEntityCreation(params) {
  return {
    type: "UPDATE_ENTITY_CREATION",
    payload: {
      params
    }
  }
}

export function finishEntityCreation() {
  return (dispatch, getState) => {
    const state = getState()

    dispatch({
      type: "FINISH_ENTITY_CREATION",
      payload: {
        path: getNewEntityPath(state),
        values: getNewEntityValues(state)
      }
    })
  }
}

export function cancelEntityCreation() {
  return {
    type: "CANCEL_ENTITY_CREATION"
  }
}

export function deleteEntity(path) {
  return {
    type: "DELETE_ENTITY",
    payload: {
      path
    }
  }
}

export function localize(path) {
  return (dispatch, getState) => {
    const languages = getState().config.languages

    dispatch({
      type: "LOCALIZE",
      payload: {
        path,
        languages
      }
    })
  }
}

export function unlocalize(path) {
  return (dispatch, getState) => {
    const defaultLanguage = getState().config.languages[0]

    dispatch({
      type: "UNLOCALIZE",
      payload: {
        path,
        defaultLanguage
      }
    })
  }
}
