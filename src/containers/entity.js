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
        value: changedValue,
        changed: originalValue !== changedValue
      }
    })

  const children = state.changedContent.getIn(state.path)
    .keySeq()
    .filter(key => key !== INDEX_KEY)
    .map(child => ({
      name: child,
      changed: !Immutable.is(originalSelf.get(child), changedSelf.get(child))
    }))

  return {
    children,
    fields,
    path: state.path
  }
}

function Entity({ children, dispatch, fields, path }) {
  return (
    <Row>
      <Col md={ 4 }>
        <h4>Children</h4>
        { renderChildren(children, path) }
      </Col>

      <Col md={ 8 }>
        <h4>Fields</h4>
        { renderFields(fields, path, dispatch) }
      </Col>
    </Row>
  )
}

function renderChildren(children, path) {
  return (
    <ListGroup>
      { children.map(child =>
        <ListGroupItem
          key={ child.name }
          active={ child.changed }
          href={ fromPath([...path, child.name]) }>
          { startCase(child.name) }
        </ListGroupItem>
      ) }
    </ListGroup>
  )
}

function renderFields(fields, path, dispatch) {
  return fields.map(field =>
    <Field
      key={ field.name }
      onChange={ (event) => {
        dispatch(changeValue([...path, INDEX_KEY, field.name], event.target.value))
      } }
      { ...field } />
  )
}
