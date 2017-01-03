import * as assetServer from "../apis/assetServer"
import { changeValue } from "./value"

export function uploadFile(path, file) {
  return async function(dispatch) {
    const fullPath = `${path.join("/")}/${file.name}`
    await assetServer.uploadFile(fullPath, file)
    dispatch(changeValue(path, { src: fullPath }))
  }
}
