import Immutable from "immutable"

import { getFieldLocalization, getLanguages } from "../selectors"

export function startFieldLocalization(field) {
  return (dispatch, getState) => {
    const state = getState()
    const languages = getLanguages(state)
    const defaultLanguageId = languages[0].id

    dispatch({
      type: "START_FIELD_LOCALIZATION",
      payload: {
        field,
        languageIds: field.isLocalized
          ? field.value.keySeq().toSet()
          : Immutable.Set.of(defaultLanguageId)
      }
    })
  }
}

export function updateFieldLocalization(languageId, addLocalization) {
  return {
    type: "UPDATE_FIELD_LOCALIZATION",
    payload: {
      languageId,
      addLocalization
    }
  }
}

export function finishFieldLocalization() {
  return (dispatch, getState) => {
    const state = getState()
    const fieldLocalization = getFieldLocalization(state)
    const languages = getLanguages(state)
    const defaultLanguageId = languages[0].id

    dispatch({
      type: "FINISH_FIELD_LOCALIZATION",
      payload: {
        defaultLanguageId,
        fieldLocalization
      }
    })
  }
}

export function cancelFieldLocalization() {
  return {
    type: "CANCEL_FIELD_LOCALIZATION"
  }
}
