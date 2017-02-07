import React from "react"
import { Glyphicon, ProgressBar } from "react-bootstrap"
import path from "path"

import FileSelector from "../components/fileSelector"

export default function AssetEditor({ config, field, onFileSelect }) {
  return (
    <div>
      { field.value ? renderView(field, config) : renderPlaceholder(field.type) }
      <hr />
      { renderUpload(field, onFileSelect) }
    </div>
  )
}

function renderView(field, config) {
  const key = field.value.get("src")
  const src = config.assetServer.assetUrl(key)
  const style = { width: "100%" }

  switch (field.type) {
    case "image": return <img key={ key } src={ src } style={ style } />
    case "video": return <video controls key={ key } src={ src } style={ style } />
    case "file": return <div key={ key } src={ src } style={ style }>{ path.basename(key) }</div>
  }
}

function renderPlaceholder(type) {
  if (type !== "file") {
    return (
      <Glyphicon
        glyph="picture"
        style={ {width: "100%", textAlign: "center"} }/>
    )
  }
}

function renderUpload(field, onFileSelect) {
  if (field.progress !== undefined) {
    return <ProgressBar min={ 0 } max={ 1 } now={ field.progress } />
  } else {
    return (
      <FileSelector accept={ field.type === "file" ? "" : `${field.type}/*` } onSelect={ onFileSelect }>
        <div>Drop { field.type } here, or click to open file dialog.</div>
      </FileSelector>
    )
  }
}
