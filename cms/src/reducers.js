import Immutable from "immutable"

export function isSaving(state = false, { type }) {
  switch (type) {
    case "START_SAVING":
      return true

    case "UPDATE_DATA":
    case "SHOW_ERROR":
      return false

    default:
      return state
  }
}

export function version(state = null, { type, payload }) {
  switch (type) {
    case "UPDATE_DATA":
      return payload.version

    default:
      return state
  }
}

export function languages(state = null, { type, payload }) {
  switch (type) {
    case "UPDATE_DATA":
      return payload.config.languages

    default:
      return state
  }
}

export function templates(state = null, { type, payload }) {
  switch (type) {
    case "UPDATE_DATA":
      return payload.templates

    default:
      return state
  }
}

export function originalContent(state = null, { type, payload }) {
  switch (type) {
    case "UPDATE_DATA":
      return Immutable.fromJS(payload.content)

    default:
      return state
  }
}

export function changedContent(state = null, { type, payload }) {
  switch (type) {
    case "UPDATE_DATA":
      return Immutable.fromJS(payload.content)

    case "CHANGE_VALUE":
      return state.setIn(payload.path, Immutable.fromJS(payload.value))

    case "UNDO_CHANGES":
      return payload.originalValue === undefined
        ? state.deleteIn(payload.path)
        : state.setIn(payload.path, payload.originalValue)

    case "FINISH_ENTITY_CREATION":
      return state.setIn(payload.path, payload.values)

    case "FINISH_ENTITY_RENAMING": {
      const parent = state.getIn(payload.path)
      const renamed = parent.mapKeys(name => name === payload.oldName ? payload.newName : name)
      return state.setIn(payload.path, renamed.toMap())
    }

    case "DELETE_ENTITY":
      return state.deleteIn(payload.path)

    case "FINISH_FIELD_LOCALIZATION": {
      const { defaultLanguageId, fieldLocalization } = payload
      const { field, languageIds } = fieldLocalization
      const localizedLanguageIds = languageIds.filter(hasLocalization => hasLocalization)
      const shouldBeLocalized = localizedLanguageIds.size > 1

      if (field.isLocalized) {
        if (shouldBeLocalized) {
          // Update localization
          const localizedValues = localizedLanguageIds
            .map((_, languageId) => field.value.get(languageId))

          return state.setIn(field.path, new Immutable.Map(localizedValues))
        } else {
          // Unlocalize field
          return state.setIn(field.path, state.getIn([...field.path, defaultLanguageId]))
        }
      } else {
        if (shouldBeLocalized) {
          // Localize field
          const localizedValues = localizedLanguageIds
            .map((_, languageId) => languageId === defaultLanguageId ? field.value : undefined)

          return state.setIn(field.path, new Immutable.Map(localizedValues))
        } else {
          // Leave field unlocalized
          return state
        }
      }
    }

    default:
      return state
  }
}

export function newEntity(state = null, { type, payload }) {
  switch (type) {
    case "START_ENTITY_CREATION":
      return payload

    case "UPDATE_ENTITY_CREATION":
      return { ...state, ...payload.params }

    case "FINISH_ENTITY_CREATION":
    case "CANCEL_ENTITY_CREATION":
      return null

    default:
      return state
  }
}

export function renamedEntity(state = null, { type, payload }) {
  switch (type) {
    case "START_ENTITY_RENAMING":
      return payload

    case "UPDATE_ENTITY_RENAMING":
      return { ...state, newName: payload.newName }

    case "FINISH_ENTITY_RENAMING":
    case "CANCEL_ENTITY_RENAMING":
      return null

    default:
      return state
  }
}

export function fieldLocalization(state = null, { type, payload }) {
  switch (type) {
    case "START_FIELD_LOCALIZATION":
      return payload

    case "UPDATE_FIELD_LOCALIZATION":
      return { ...state,
        languageIds: state.languageIds.set(payload.languageId, payload.hasLocalization)
      }

    case "FINISH_FIELD_LOCALIZATION":
    case "CANCEL_FIELD_LOCALIZATION":
      return null

    default:
      return state
  }
}

export function path(state = [], { type, payload }) {
  switch (type) {
    case "UPDATE_PATH":
      return payload.path

    default:
      return state
  }
}

export function flash(state = null, { type, payload }) {
  switch (type) {
    case "SHOW_ERROR":
      return payload

    case "HIDE_ERROR":
      return null

    default:
      return state
  }
}

export function progress(state = new Immutable.Map(), { type, payload }) {
  switch (type) {
    case "START_UPLOAD":
      return state.set(payload.path.toString(), 0)

    case "PROGRESS_UPLOAD":
      return state.set(payload.path.toString(), payload.progress)

    case "CHANGE_VALUE":
    case "CANCEL_UPLOAD":
      return state.delete(payload.path.toString())

    default:
      return state
  }
}

export function whitelist(state = null, { type, payload }) {
  switch (type) {
    case "WHITELIST_PATHS":
      return payload.whitelist

    default:
      return state
  }
}
