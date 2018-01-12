import React from "react"
import { FormControl } from "react-bootstrap"

export default function StringEditor({ field, onChange }) {
  return <FormControl type="text" value={ field.value } onChange={ onChange } />
}
