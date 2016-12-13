import React from "react"
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { connect } from "react-redux"

import Field from "./field"

export default connect(mapStateToProps)(Entity)

const INDEX_KEY = "index"
const TEMPLATE_KEY = "template"

function mapStateToProps(state, ownProps) {
  const { splat } = ownProps.location
  const path = splat ? splat.split("/") : []

  const values = state.content.getIn([...path, INDEX_KEY])

  return {
    values,
    children: state.content.getIn(path).keySeq().filter(key => key !== INDEX_KEY),
    template: state.templates[values.get(TEMPLATE_KEY)]
  }
}

function Entity({ children, values, template }) {
  return (
    <Row>
      <Col md={ 4 }>
        <h2>Children</h2>
        { renderChildren(children) }
      </Col>

      <Col md={ 8 }>
        <h2>Fields</h2>
        { renderFields(template.fields, values) }
      </Col>
    </Row>
  )
}

function renderChildren(children) {
  return (
    <ListGroup>
      { children.map(child => <ListGroupItem key={ child }>{ child }</ListGroupItem>) }
    </ListGroup>
  )
}

function renderFields(fields, values) {
  return fields.map(field =>
    <Field key={ field.name } value={ values.get(field.name) } { ...field } />
  )
}
