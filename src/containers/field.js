import startCase from "lodash/startCase"
import React from "react"
import { Panel } from "react-bootstrap"

export default function Field({ name, value }) {
  return (
    <Panel header={ startCase(name) }>
      { value }
    </Panel>
  )
}
