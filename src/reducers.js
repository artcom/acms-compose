import Immutable from "immutable"

export function originalContent(state = null, action) {
  switch (action.type) {
    case "UPDATE_DATA":
      return Immutable.fromJS(action.payload.content)

    default:
      return state
  }
}

export function changedContent(state = null, action) {
  switch (action.type) {
    case "UPDATE_DATA":
      return Immutable.fromJS(action.payload.content)

    case "CHANGE_VALUE":
      return state.setIn(action.payload.path, action.payload.value)

    default:
      return state
  }
}

export function templates(state = null, action) {
  switch (action.type) {
    case "UPDATE_DATA":
      return action.payload.templates

    default:
      return state
  }
}

export function version(state = null, action) {
  switch (action.type) {
    case "UPDATE_DATA":
      return action.payload.version

    default:
      return state
  }
}

export function path(state = [], action) {
  switch (action.type) {
    case "UPDATE_PATH":
      return action.payload

    default:
      return state
  }
}
