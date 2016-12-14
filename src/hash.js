export function fromPath(path) {
  return `#${path.join("/")}`
}

export function toPath(hash) {
  return hash ? hash.substring(1).split("/") : []
}
