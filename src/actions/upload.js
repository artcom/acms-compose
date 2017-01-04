import * as assetServer from "../apis/assetServer"

import { showError } from "./error"
import { changeValue } from "./value"

export function uploadFile(path, file) {
  return async function(dispatch) {
    function onUploadProgress(event) {
      dispatch(progressUpload(path, event.loaded / event.total))
    }

    dispatch(startUpload(path))
    const fullPath = `${path.join("/")}/${file.name}`

    try {
      await assetServer.uploadFile(fullPath, file, { onUploadProgress })
      dispatch(changeValue(path, { src: fullPath }))
    } catch (error) {
      dispatch(cancelUpload(path))
      dispatch(showError("Failed to Upload File", error))
    }
  }
}

function startUpload(path) {
  return {
    type: "START_UPLOAD",
    payload: {
      path
    }
  }
}

function progressUpload(path, progress) {
  return {
    type: "PROGRESS_UPLOAD",
    payload: {
      path,
      progress
    }
  }
}

function cancelUpload(path) {
  return {
    type: "CANCEL_UPLOAD",
    payload: {
      path
    }
  }
}
