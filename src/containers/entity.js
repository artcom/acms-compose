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

import { deleteEntity, startEntityCreation, startEntityRenaming } from "../actions/entity"
import { undoChanges } from "../actions/value"
import { fromPath } from "../hash"

import {
  getLanguages,
  getTemplateChildren,
  getWhitelistedChildren,
  getWhitelistedFields
} from "../selectors"

export default connect(mapStateToProps)(Entity)

function mapStateToProps(state) {
  return {
    canHaveChildren: getTemplateChildren(state).length > 0,
    children: getWhitelistedChildren(state),
    fields: getWhitelistedFields(state),
    languages: getLanguages(state)
  }
}

function Entity({ canHaveChildren, children, config, dispatch, fields, languages }) {
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
        { renderFields(fields, languages, config, dispatch) }
      </Col>
    </Row>
  )
}

function renderChildren(children, dispatch) {
  return (
    <ListGroup>
      { children.map(child => renderChild(child, dispatch)) }
    </ListGroup>
  )
}

function renderChild(child, dispatch) {
  const displayName = startCase(child.name)
  const link = child.isDeleted ? displayName : <a href={ fromPath(child.path) }>{ displayName }</a>

  return (
    <ListGroupItem key={ child.name } bsStyle={ childStyle(child) }>
      { link }

      <Dropdown pullRight style={ { float: "right" } } id={ child.name }>
        <Dropdown.Toggle noCaret bsSize="xsmall">
          <Glyphicon glyph="option-vertical" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem
            disabled={ child.isDeleted }
            onSelect={ () => dispatch(startEntityRenaming(child.name)) }>
            Rename...
          </MenuItem>
          <MenuItem
            disabled={ !child.hasChanged }
            onSelect={ () => dispatch(undoChanges(child.path)) }>
            Undo Changes
          </MenuItem>
          <MenuItem
            disabled={ child.isDeleted }
            onSelect={ () => dispatch(deleteEntity(child.path)) }>
            Delete
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </ListGroupItem>
  )
}

function childStyle(child) {
  if (child.isNew) {
    return "success"
  }

  if (child.isDeleted) {
    return "danger"
  }

  if (child.hasChanged) {
    return "info"
  }
}

function renderFields(fields, languages, config, dispatch) {
  return fields.map(field =>
    <Field
      key={ field.name }
      field={ field }
      languages={ languages }
      config={ config }
      dispatch={ dispatch } />
  )
}
