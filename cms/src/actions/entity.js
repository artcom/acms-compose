import kebabCase from "lodash/kebabCase"
import startCase from "lodash/startCase"

import {
  getNewEntityPath,
  getNewEntityValues,
  getPath,
  getRenamedEntity,
  getTemplateChildren
} from "../selectors"

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

export function startEntityRenaming(oldName) {
  return {
    type: "START_ENTITY_RENAMING",
    payload: {
      oldName,
      newName: startCase(oldName)
    }
  }
}

export function updateEntityRenaming(newName) {
  return {
    type: "UPDATE_ENTITY_RENAMING",
    payload: {
      newName
    }
  }
}

export function finishEntityRenaming() {
  return (dispatch, getState) => {
    const state = getState()
    const { oldName, newName } = getRenamedEntity(state)

    dispatch({
      type: "FINISH_ENTITY_RENAMING",
      payload: {
        path: getPath(state),
        oldName,
        newName: kebabCase(newName)
      }
    })
  }
}

export function cancelEntityRenaming() {
  return {
    type: "CANCEL_ENTITY_RENAMING"
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
