import startCase from "lodash/startCase"
import React from "react"
import { connect } from "react-redux"

import { Button, ControlLabel, FormControl, FormGroup, Modal } from "react-bootstrap"

import { cancelEntityCreation, finishEntityCreation } from "../actions"

export default connect(mapStateToProps)(EntityCreationModal)

function mapStateToProps(state) {
  const newEntity = state.newEntity || {
    name: "",
    templateOptions: []
  }

  return {
    isVisible: Boolean(state.newEntity),
    newEntity
  }
}

function EntityCreationModal({ dispatch, isVisible, newEntity }) {
  return (
    <Modal show={ isVisible } onHide={ () => dispatch(cancelEntityCreation()) }>
      <Modal.Header closeButton>
        <Modal.Title>Add Child</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" value={ startCase(newEntity.name) } />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Template</ControlLabel>
          <FormControl
            componentClass="select"
            value={ newEntity.template }
            disabled={ newEntity.templateOptions.length < 2 }>
            { newEntity.templateOptions.map(option =>
              <option key={ option } value={ option }>{ startCase(option) }</option>
            ) }
          </FormControl>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="info" onClick={ () => dispatch(finishEntityCreation()) }>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
