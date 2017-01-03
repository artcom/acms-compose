import React from "react"
import { Glyphicon } from "react-bootstrap"
import Dropzone from "react-dropzone"

import { assetUrl } from "../apis/assetServer"

const style = {
  borderWidth: "2px",
  borderColor: "#555",
  borderStyle: "dashed",
  borderRadius: "0.3rem",
  padding: "1rem",
  textAlign: "center"
}

const activeStyle = {
  color: "#3c763d",
  backgroundColor: "#dff0d8",
  borderStyle: "solid"
}

const rejectStyle = {
  color: "#a94442",
  backgroundColor: "#f2dede",
  borderStyle: "solid"
}

export default function ImageEditor({ field, onDrop }) {
  return (
    <div>
      { renderImage(field) }

      <hr />

      <Dropzone
        accept="image/*"
        multiple={ false }
        style={ style }
        activeStyle={ activeStyle }
        rejectStyle={ rejectStyle }
        onDrop={ onDrop }>
        <div>Drop image here, or click to open file dialog.</div>
      </Dropzone>
    </div>
  )
}

function renderImage(field) {
  if (field.value) {
    return <img src={ assetUrl(field.value.src) } style={ { width: "100%" } } />
  } else {
    return <Glyphicon glyph="picture" />
  }
}
