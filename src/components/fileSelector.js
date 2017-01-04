import React from "react"
import Dropzone from "react-dropzone"

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

export default function FileSelector({ accept, children, onSelect }) {
  return (
    <Dropzone
      accept={ accept }
      multiple={ false }
      style={ style }
      activeStyle={ activeStyle }
      rejectStyle={ rejectStyle }
      onDrop={ onSelect }>
      { children }
    </Dropzone>
  )
}
