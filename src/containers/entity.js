import startCase from "lodash/startCase"
import React from "react"
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { connect } from "react-redux"

import Field from "./field"

import { fromPath } from "../hash"

export default connect(mapStateToProps)(Entity)

const INDEX_KEY = "index"
const TEMPLATE_KEY = "template"

function mapStateToProps(state) {
  const values = state.content.getIn([...state.path, INDEX_KEY])

  return {
    values,
    children: state.content.getIn(state.path).keySeq().filter(key => key !== INDEX_KEY),
    template: state.templates[values.get(TEMPLATE_KEY)],
    path: state.path
  }
}

function Entity({ children, path, template, values }) {
  return (
    <Row>
      <Col md={ 4 }>
        <h4>Children</h4>
        { renderChildren(children, path) }
      </Col>

      <Col md={ 8 }>
        <h4>Fields</h4>
        { renderFields(template.fields, values) }
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

function renderFields(fields, values) {
  return fields.map(field =>
    <Field key={ field.name } value={ values.get(field.name) } { ...field } />
  )
}
