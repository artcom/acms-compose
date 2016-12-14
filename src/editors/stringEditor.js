import React from "react"
import { FormControl } from "react-bootstrap"

export default function StringEditor({ field }) {
  return <FormControl type="text" value={ field.value } />
}
