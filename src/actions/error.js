export function showError(message) {
  return {
    type: "SHOW_ERROR",
    payload: {
      message
    }
  }
}

export function hideError() {
  return {
    type: "HIDE_ERROR"
  }
}
