import React from "react"
import { connect } from "react-redux"

import { Button, Checkbox, ControlLabel, Form, FormGroup, Label, Modal } from "react-bootstrap"

import {
  cancelFieldLocalization,
  finishFieldLocalization,
  updateFieldLocalization
} from "../actions/localization"

import { getFieldLocalization, getLanguages } from "../selectors"

export default connect(mapStateToProps)(FieldLocalizationModal)

function mapStateToProps(state) {
  return {
    fieldLocalization: getFieldLocalization(state),
    languages: getLanguages(state)
  }
}

function FieldLocalizationModal({ dispatch, fieldLocalization, languages }) {
  return (
    <Modal
      show={ fieldLocalization.isVisible }
      onHide={ () => dispatch(cancelFieldLocalization()) }>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Localize Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Languages</ControlLabel>
            {
              languages.map((language, index) => {
                const isDefault = index === 0

                return <Checkbox
                  key={ language.id }
                  disabled={ isDefault }
                  checked={ fieldLocalization.languageIds.get(language.id) }
                  onChange={ (event) =>
                    dispatch(updateFieldLocalization(language.id, event.target.checked))
                  }>
                  { language.name } { isDefault && <Label>Default</Label>}
                </Checkbox>
              })
            }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            bsStyle="info"
            onClick={ (event) => { event.preventDefault(); dispatch(finishFieldLocalization()) } }>
            Localize
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
