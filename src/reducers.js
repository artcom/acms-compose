import Immutable from "immutable"

export function content(state = null, action) {
  switch (action.type) {
    case "UPDATE_DATA":
      return Immutable.fromJS(action.payload.content)

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
