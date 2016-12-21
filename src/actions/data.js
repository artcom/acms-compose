import * as gitJsonApi from "../apis/gitJsonApi"
import { getChangedContent, getVersion } from "../selectors"

import { showError } from "./error"

export function loadData() {
  return async function(dispatch) {
    try {
      const { data, version } = await gitJsonApi.loadData()
      dispatch(updateData(data, version))
    } catch (error) {
      dispatch(showError("Failed to Load Data", error))
    }
  }
}

export function saveData() {
  return async function(dispatch, getState) {
    const state = getState()
    const version = getVersion(state)
    const content = getChangedContent(state)

    try {
      dispatch(startSaving())
      await gitJsonApi.updateContent(content.toJS(), version)
      dispatch(loadData())
    } catch (error) {
      dispatch(showError("Failed to Save Data", error))
    }
  }
}

function startSaving() {
  return {
    type: "START_SAVING"
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
