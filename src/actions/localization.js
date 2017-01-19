import { getLanguages } from "../selectors"

export function localize(path) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch({
      type: "LOCALIZE",
      payload: {
        path,
        languages: getLanguages(state)
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
        defaultLanguage: getLanguages(state)[0]
      }
    })
  }
}
