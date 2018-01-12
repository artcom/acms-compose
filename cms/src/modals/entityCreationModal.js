import startCase from "lodash/startCase"
import React from "react"
import { connect } from "react-redux"

import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from "react-bootstrap"

import { cancelEntityCreation, finishEntityCreation, updateEntityCreation } from "../actions/entity"
import { getNewEntity } from "../selectors"

export default connect(mapStateToProps)(EntityCreationModal)

function mapStateToProps(state) {
  return {
    newEntity: getNewEntity(state)
  }
}

function EntityCreationModal({ dispatch, newEntity }) {
  return (
    <Modal show={ newEntity.isVisible } onHide={ () => dispatch(cancelEntityCreation()) }>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Add Child</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup validationState={ newEntity.isValidName ? null : "error" }>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={ newEntity.name }
              autoFocus
              onChange={ (event) => dispatch(updateEntityCreation({
                name: event.target.value
              })) } />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Template</ControlLabel>
            <FormControl
              componentClass="select"
              value={ newEntity.template }
              disabled={ newEntity.templates.length < 2 }
              onChange={ (event) => dispatch(updateEntityCreation({
                template: event.target.value
              })) }>
              { newEntity.templates.map(template =>
                <option key={ template } value={ template }>{ startCase(template) }</option>
              ) }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            bsStyle="info"
            disabled={ !newEntity.isValidName }
            onClick={ (event) => { event.preventDefault(); dispatch(finishEntityCreation()) } }>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
