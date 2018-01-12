export function showError(title, error) {
  return {
    type: "SHOW_ERROR",
    payload: {
      error,
      title
    }
  }
}

export function hideError() {
  return {
    type: "HIDE_ERROR"
  }
}
