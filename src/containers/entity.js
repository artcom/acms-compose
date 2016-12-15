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
  const values = state.changedContent.getIn([...state.path, INDEX_KEY])
  const template = state.templates[values.get(TEMPLATE_KEY)]

  const fields = template.fields
    .map(field => ({ ...field, value: values.get(field.name) }))
    .filter(field => !field.condition || evaluate(field.condition, values))

  return {
    children: state.changedContent.getIn(state.path).keySeq().filter(key => key !== INDEX_KEY),
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
        <ListGroupItem key={ child } href={ fromPath([...path, child]) }>
          { startCase(child) }
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
