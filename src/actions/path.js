import { toPath } from "../hash"

export function updatePath(hash) {
  return {
    type: "UPDATE_PATH",
    payload: {
      path: toPath(hash)
    }
  }
}
