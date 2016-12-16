import { getConfig } from "../selectors"

export function localize(path) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch({
      type: "LOCALIZE",
      payload: {
        path,
        languages: getConfig(state).languages
      }
    })
  }
}

export function unlocalize(path) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch({
      type: "UNLOCALIZE",
      payload: {
        path,
        defaultLanguage: getConfig(state).languages[0]
      }
    })
  }
}
