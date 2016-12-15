import Immutable from "immutable"
import startCase from "lodash/startCase"
import React from "react"
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { connect } from "react-redux"

import Field from "./field"

import { changeValue } from "../actions"
import { evaluate } from "../condition"
import { fromPath } from "../hash"

export default connect(mapStateToProps)(Entity)

const INDEX_KEY = "index"
const TEMPLATE_KEY = "template"

function mapStateToProps(state) {
  const originalSelf = state.originalContent.getIn(state.path)
  const changedSelf = state.changedContent.getIn(state.path)
  const originalValues = originalSelf.get(INDEX_KEY)
  const changedValues = changedSelf.get(INDEX_KEY)
  const template = state.templates[changedValues.get(TEMPLATE_KEY)]

  const fields = template.fields
    .filter(field => !field.condition || evaluate(field.condition, changedValues))
    .map(field => {
      const originalValue = originalValues.get(field.name)
      const changedValue = changedValues.get(field.name)

      return { ...field,
        hasChanged: !Immutable.is(originalValue, changedValue),
        isLocalized: isLocalized(changedValue, state.config.languages),
        path: [...state.path, INDEX_KEY, field.name],
        value: changedValue
      }
    })

  const children = state.changedContent.getIn(state.path)
    .keySeq()
    .filter(key => key !== INDEX_KEY)
    .map(child => ({
      hasChanged: !Immutable.is(originalSelf.get(child), changedSelf.get(child)),
      name: child,
      path: [...state.path, child]
    }))

  return {
    children,
    fields
  }
}

function isLocalized(value, languages) {
  return Immutable.Map.isMap(value) && languages.every(language => value.has(language))
}

function Entity({ children, dispatch, fields }) {
  return (
    <Row>
      <Col md={ 4 }>
        <h4>Children</h4>
        { renderChildren(children) }
      </Col>

      <Col md={ 8 }>
        <h4>Fields</h4>
        { renderFields(fields, dispatch) }
      </Col>
    </Row>
  )
}

function renderChildren(children) {
  return (
    <ListGroup>
      { children.map(child =>
        <ListGroupItem
          key={ child.name }
          active={ child.hasChanged }
          href={ fromPath(child.path) }>
          { startCase(child.name) }
        </ListGroupItem>
      ) }
    </ListGroup>
  )
}

function renderFields(fields, dispatch) {
  const onChange = (path, value) => { dispatch(changeValue(path, value)) }

  return fields.map(field =>
    <Field key={ field.name } onChange={ onChange } field={ field } />
  )
}
