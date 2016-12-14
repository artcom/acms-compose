import React from "react"
import { FormControl } from "react-bootstrap"

export default function StringEditor({ field }) {
  return (
    <FormControl componentClass="select" value={ field.value }>
      { field.values.map(value =>
        <option key={ value.value } value={ value.value }>{ value.name }</option>
      )}
    </FormControl>
  )
}
