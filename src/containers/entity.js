import startCase from "lodash/startCase"
import React from "react"
import { connect } from "react-redux"

import {
  Button,
  Col,
  Dropdown,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  MenuItem,
  Row
 } from "react-bootstrap"

import Field from "./field"

import { deleteEntity, startEntityCreation, undoChanges } from "../actions"
import { fromPath } from "../hash"
import { getChildren, getFields, getTemplateChildren } from "../selectors"

export default connect(mapStateToProps)(Entity)

function mapStateToProps(state) {
  return {
    canHaveChildren: getTemplateChildren(state).length > 0,
    children: getChildren(state),
    fields: getFields(state)
  }
}

function Entity({ canHaveChildren, children, dispatch, fields }) {
  return (
    <Row>
      <Col md={ 4 }>
        <h4>Children</h4>
        { renderChildren(children, dispatch) }
        <Button disabled={ !canHaveChildren } onClick={ () => dispatch(startEntityCreation()) }>
          <Glyphicon glyph="plus" />
        </Button>
      </Col>

      <Col md={ 8 }>
        <h4>Fields</h4>
        { renderFields(fields, dispatch) }
      </Col>
    </Row>
  )
}

function renderChildren(children, dispatch) {
  return (
    <ListGroup>
      { children.map(child =>
        <ListGroupItem key={ child.name } bsStyle={ child.hasChanged ? "info" : undefined }>
          <a href={ fromPath(child.path) }>{ startCase(child.name) }</a>

          <Dropdown pullRight style={ { float: "right" } } id={ child.name }>
            <Dropdown.Toggle noCaret bsSize="xsmall">
              <Glyphicon glyph="option-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem
                disabled={ !child.hasChanged }
                onClick={ () => dispatch(undoChanges(child.path)) }>
                Undo Changes
              </MenuItem>
              <MenuItem
                onClick={ () => dispatch(deleteEntity(child.path)) }>
                Delete
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroupItem>
      ) }
    </ListGroup>
  )
}

function renderFields(fields, dispatch) {
  return fields.map(field =>
    <Field key={ field.name } dispatch={ dispatch } field={ field } />
  )
}
