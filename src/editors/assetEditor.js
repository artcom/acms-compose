import React from "react"
import { Glyphicon, ProgressBar } from "react-bootstrap"

import { assetUrl } from "../apis/assetServer"
import FileSelector from "../components/fileSelector"

export default function AssetEditor({ field, onFileSelect }) {
  return (
    <div>
      { field.value ? renderView(field) : renderPlaceholder() }
      <hr />
      { renderUpload(field, onFileSelect) }
    </div>
  )
}

function renderView(field) {
  const key = field.value.src
  const src = assetUrl(field.value.src)
  const style = { width: "100%" }

  switch (field.type) {
    case "image": return <img key={ key } src={ src } style={ style } />
    case "video": return <video controls key={ key } src={ src } style={ style } />
  }
}

function renderPlaceholder() {
  return (
    <Glyphicon
      glyph="picture"
      style={ { width: "100%", textAlign: "center" } } />
  )
}

function renderUpload(field, onFileSelect) {
  if (field.progress !== undefined) {
    return <ProgressBar min={ 0 } max={ 1 } now={ field.progress } />
  } else {
    return (
      <FileSelector accept={ `${field.type}/*` } onSelect={ onFileSelect }>
        <div>Drop { field.type } here, or click to open file dialog.</div>
      </FileSelector>
    )
  }
}
