import langs from "langs"
import startCase from "lodash/startCase"
import React from "react"
import { ControlLabel, FormGroup, Panel } from "react-bootstrap"

import EnumEditor from "../editors/enumEditor"
import MarkdownEditor from "../editors/markdownEditor"
import StringEditor from "../editors/stringEditor"

const editors = {
  enum: EnumEditor,
  markdown: MarkdownEditor,
  string: StringEditor
}

export default function Field({ field, onChange }) {
  const { style, content } = renderContent(field, onChange)

  return (
    <Panel bsStyle={ style } header={ startCase(field.name) }>
      { content }
    </Panel>
  )
}

function renderContent(field, onChange) {
  const Editor = editors[field.type]

  if (!Editor) {
    return {
      style: "danger",
      content: <span>Unknown field type <code>{ field.type }</code></span>
    }
  }

  return {
    style: field.hasChanged ? "primary" : "default",
    content: field.isLocalized
      ? renderLocalizedEditors(field, onChange, Editor)
      : renderEditor(field, onChange, Editor)
  }
}

function renderLocalizedEditors(field, onChange, Editor) {
  return field.value.map((value, language) => {
    const languageField = { ...field,
      path: [...field.path, language],
      value: field.value.get(language)
    }

    const languageName = langs.has(1, language) ? langs.where(1, language).name : "Custom Language"

    return (
      <FormGroup key={ language }>
        <ControlLabel>
          { languageName }
        </ControlLabel>

        { renderEditor(languageField, onChange, Editor) }
      </FormGroup>
    )
  })
}

function renderEditor(field, onChange, Editor) {
  return (
    <Editor
      key={ field.path }
      field={ field }
      onChange={ (event) => onChange(field.path, event.target.value) } />
  )
}
