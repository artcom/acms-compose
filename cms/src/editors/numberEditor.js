import get from "lodash/get"
import isNumber from "lodash/isNumber"
import React from "react"
import { FormControl, FormGroup, HelpBlock } from "react-bootstrap"

export default function NumberEditor({ field, onChange }) {
  const value = field.value
  const min = get(field, "min", -Infinity)
  const max = get(field, "max", Infinity)
  const isValid = isNumber(value) && value >= min && value <= max

  function onChangeFloat(event) {
    onChange({
      target: {
        value: parseFloat(event.target.value)
      }
    })
  }

  return (
    <FormGroup validationState={ isValid ? null : "warning" }>
      <FormControl type="number" value={ value } onChange={ onChangeFloat } />
      { isValid || <HelpBlock>The number should be between { min } and { max }.</HelpBlock> }
    </FormGroup>
  )
}
