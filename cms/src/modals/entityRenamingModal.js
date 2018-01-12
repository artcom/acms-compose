import React from "react"
import { connect } from "react-redux"

import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from "react-bootstrap"

import { cancelEntityRenaming, finishEntityRenaming, updateEntityRenaming } from "../actions/entity"
import { getRenamedEntity } from "../selectors"

export default connect(mapStateToProps)(EntityRenamingModal)

function mapStateToProps(state) {
  return {
    renamedEntity: getRenamedEntity(state)
  }
}

function EntityRenamingModal({ dispatch, renamedEntity }) {
  return (
    <Modal show={ renamedEntity.isVisible } onHide={ () => dispatch(cancelEntityRenaming()) }>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Rename Child</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup validationState={ renamedEntity.isValidName ? null : "error" }>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={ renamedEntity.newName }
              autoFocus
              onChange={ (event) => dispatch(updateEntityRenaming(event.target.value)) } />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            bsStyle="info"
            disabled={ !renamedEntity.isValidName }
            onClick={ (event) => { event.preventDefault(); dispatch(finishEntityRenaming()) } }>
            Rename
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
