import { basename, extname } from "path"
import createHash from "sha.js"

import * as assetServer from "../apis/assetServer"
import { toTypedArray } from "../file"

import { showError } from "./error"
import { changeValue } from "./value"

export function uploadFile(path, file) {
  return async function(dispatch) {
    function onUploadProgress(event) {
      dispatch(progressUpload(path, event.loaded / event.total))
    }

    try {
      dispatch(startUpload(path))
      const destination = await hashPath(file)

      if (!await assetServer.exists(destination)) {
        await assetServer.uploadFile(destination, file, { onUploadProgress })
      }

      dispatch(changeValue(path, { src: destination }))
    } catch (error) {
      dispatch(cancelUpload(path))
      dispatch(showError("Failed to Upload File", error))
    }
  }
}

async function hashPath(file) {
  const hash = await sha1(file)
  const extension = extname(file.name)
  const name = basename(file.name, extension)
  return `${hash.substring(0, 2)}/${name}-${hash}${extension}`
}

async function sha1(file) {
  const buffer = await toTypedArray(file)
  const hash = createHash("sha1")
  return hash.update(buffer).digest("hex")
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
