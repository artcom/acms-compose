import startCase from "lodash/startCase"
import React from "react"
import { Panel } from "react-bootstrap"

import EnumEditor from "../editors/enumEditor"
import MarkdownEditor from "../editors/markdownEditor"
import StringEditor from "../editors/stringEditor"

const editors = {
  enum: EnumEditor,
  markdown: MarkdownEditor,
  string: StringEditor
}

export default function Field(field) {
  const Editor = editors[field.type]

  if (!Editor) {
    return (
      <Panel bsStyle="danger" header={ startCase(field.name) }>
        Unknown field type <code>{ field.type }</code>
      </Panel>
    )
  }

  return (
    <Panel header={ startCase(field.name) }>
      <Editor field={ field } />
    </Panel>
  )
}
