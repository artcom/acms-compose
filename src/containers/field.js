import langs from "langs"
import startCase from "lodash/startCase"
import React from "react"
import { ControlLabel, Dropdown, FormGroup, Glyphicon, MenuItem, Panel } from "react-bootstrap"

import { changeValue, undoChanges } from "../actions/value"
import { localize, unlocalize } from "../actions/localization"
import { uploadFile } from "../actions/upload"

import editors from "../editors"

export default function Field(props) {
  const { style, content } = renderContent(props)

  return (
    <Panel bsStyle={ style } header={ renderHeader(props) }>
      { content }
    </Panel>
  )
}

function renderHeader({ field, dispatch }) {
  return <div>
    { startCase(field.name) }

    <Dropdown pullRight style={ { float: "right" } } id={ field.name }>
      <Dropdown.Toggle noCaret bsSize="xsmall">
        <Glyphicon glyph="option-vertical" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        { renderMenuItems(field, dispatch) }
      </Dropdown.Menu>
    </Dropdown>
  </div>
}

function renderMenuItems(field, dispatch) {
  const items = [
    <MenuItem
      key="undo"
      disabled={ !field.hasChanged }
      onSelect={ () => dispatch(undoChanges(field.path)) }>
      Undo Changes
    </MenuItem>
  ]

  if (field.isLocalized) {
    items.push(
      <MenuItem
        key="unlocalize"
        onSelect={ () => dispatch(unlocalize(field.path)) }>
        Unlocalize
      </MenuItem>
    )
  } else {
    items.push(
      <MenuItem
        key="localize"
        onSelect={ () => dispatch(localize(field.path)) }>
        Localize
      </MenuItem>
    )
  }

  return items
}

function renderContent({ field, dispatch }) {
  const Editor = editors[field.type]

  if (!Editor) {
    return {
      style: "danger",
      content: <span>Unknown field type <code>{ field.type }</code></span>
    }
  }

  return {
    style: field.hasChanged ? "info" : "default",
    content: field.isLocalized
      ? renderLocalizedEditors(field, dispatch, Editor)
      : renderEditor(field, dispatch, Editor)
  }
}

function renderLocalizedEditors(field, dispatch, Editor) {
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

        { renderEditor(languageField, dispatch, Editor) }
      </FormGroup>
    )
  }).valueSeq()
}

function renderEditor(field, dispatch, Editor) {
  return (
    <Editor
      key={ field.path }
      field={ field }
      onChange={ (event) => dispatch(changeValue(field.path, event.target.value)) }
      onDrop={ (files) => dispatch(uploadFile(field.path, files[0])) } />
  )
}
