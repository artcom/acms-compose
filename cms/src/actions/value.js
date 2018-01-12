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
    const originalValue = getState().originalContent.getIn(path)

    dispatch({
      type: "UNDO_CHANGES",
      payload: {
        path,
        originalValue
      }
    })
  }
}
