import React from "react"
import { Glyphicon, ProgressBar } from "react-bootstrap"

import { assetUrl } from "../apis/assetServer"
import FileSelector from "../components/fileSelector"

export default function ImageEditor({ field, onFileSelect }) {
  return (
    <div>
      { renderImage(field) }
      <hr />
      { renderUpload(field, onFileSelect) }
    </div>
  )
}

function renderImage(field) {
  if (field.value) {
    return (
      <img
        key={ field.value.src }
        src={ assetUrl(field.value.src) }
        style={ { width: "100%" } } />
    )
  } else {
    return (
      <Glyphicon
        glyph="picture"
        style={ { width: "100%", textAlign: "center" } } />
    )
  }
}

function renderUpload(field, onFileSelect) {
  if (field.progress !== undefined) {
    return <ProgressBar min={ 0 } max={ 1 } now={ field.progress } />
  } else {
    return (
      <FileSelector accept="image/*" onSelect={ onFileSelect }>
        <div>Drop image here, or click to open file dialog.</div>
      </FileSelector>
    )
  }
}
