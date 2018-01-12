export function fromPath(path) {
  return `#/${path.join("/")}`
}

export function toPath(hash) {
  if (hash === "" || hash === "#/") {
    return []
  } else {
    return hash.substring(2).split("/")
  }
}
