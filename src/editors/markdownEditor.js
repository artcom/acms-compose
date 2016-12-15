import React from "react"
import { FormControl } from "react-bootstrap"

export default function MarkdownEditor({ field }) {
  return (
    <FormControl
      componentClass="textarea"
      rows={ 8 }
      value={ field.value }
      onChange={ field.onChange } />
  )
}
