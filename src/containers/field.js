import startCase from "lodash/startCase"
import React from "react"
import { Panel } from "react-bootstrap"

import StringEditor from "../editors/stringEditor"

const editors = {
  string: StringEditor
}

export default function Field({ name, type, value }) {
  const Editor = editors[type]

  if (!Editor) {
    return (
      <Panel bsStyle="danger" header={ startCase(name) }>
        Unknown field type <code>{ type }</code>
      </Panel>
    )
  }

  return (
    <Panel header={ startCase(name) }>
      <Editor value={ value } />
    </Panel>
  )
}
