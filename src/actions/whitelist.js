export function whitelistPaths(whitelist) {
  return {
    type: "WHITELIST_PATHS",
    payload: {
      whitelist
    }
  }
}
