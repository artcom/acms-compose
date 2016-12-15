import axios from "axios"

import { toPath } from "./hash"

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
    const state = getState()
    const originalValue = state.originalContent.getIn(path)

    dispatch({
      type: "UNDO_CHANGES",
      payload: {
        path,
        originalValue
      }
    })
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
    const state = getState()
    const languages = state.config.languages

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
    const state = getState()
    const defaultLanguage = state.config.languages[0]

    dispatch({
      type: "UNLOCALIZE",
      payload: {
        path,
        defaultLanguage
      }
    })
  }
}
