import { getLanguages } from "../selectors"

export function addLocalization(path, languageId) {
  return (dispatch, getState) => {
    const state = getState()
    const languages = getLanguages(state)

    return {
      type: "ADD_LOCALIZATION",
      payload: {
        path,
        languageId,
        languages
      }
    }
  }
}

export function removeLocalization(path, languageId) {
  return {
    type: "REMOVE_LOCALIZATION",
    payload: {
      path,
      languageId
    }
  }
}
