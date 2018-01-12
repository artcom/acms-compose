import React from "react"
import { FormControl } from "react-bootstrap"

export default function MarkdownEditor({ field, onChange }) {
  return (
    <FormControl
      componentClass="textarea"
      rows={ 8 }
      value={ field.value }
      onChange={ onChange } />
  )
}
