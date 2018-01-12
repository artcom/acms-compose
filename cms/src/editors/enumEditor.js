import React from "react"
import { FormControl } from "react-bootstrap"

export default function EnumEditor({ field, onChange }) {
  function onChangeEnum(event) {
    onChange({
      target: {
        value: field.values[event.target.value].value
      }
    })
  }

  const selectedIndex = field.values.findIndex(value => value.value === field.value)

  return (
    <FormControl componentClass="select" value={ selectedIndex } onChange={ onChangeEnum }>
      { field.values.map((value, index) =>
        <option key={ index } value={ index }>{ value.name }</option>
      ) }
    </FormControl>
  )
}
