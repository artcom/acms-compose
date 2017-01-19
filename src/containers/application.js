import Immutable from "immutable"
import startCase from "lodash/startCase"
import React from "react"
import { Alert, Breadcrumb, Button, Col, Grid, Row } from "react-bootstrap"
import { connect } from "react-redux"

import { saveData } from "../actions/data"
import { hideError } from "../actions/error"
import { fromPath } from "../hash"

export default connect(mapStateToProps)(Application)

function mapStateToProps(state) {
  return {
    flash: state.flash,
    hasChanged: !Immutable.is(state.originalContent, state.changedContent),
    isLoading: state.originalContent === null,
    isSaving: state.isSaving,
    path: state.path
  }
}

function Application(props) {
  return (
    <Grid style={ { marginTop: "15px" } }>
      { renderError(props) }
      { !props.isLoading && renderHeader(props) }
      { !props.isLoading && props.children }
    </Grid>
  )
}

function renderError({ dispatch, flash }) {
  if (flash) {
    return (
      <Alert bsStyle="danger" onDismiss={ () => dispatch(hideError()) }>
        <h4>{ flash.title }</h4>
        <pre>
          <code>
            { JSON.stringify(flash.error.response, null, 2) || flash.error.stack }
          </code>
        </pre>
      </Alert>
    )
  }
}

function renderHeader({ config, dispatch, hasChanged, isSaving, path }) {
  return (
    <Row>
      <Col md={ 10 }>
        <Breadcrumb>
          <Breadcrumb.Item href={ fromPath([]) }>
            Exhibition
          </Breadcrumb.Item>
          { path.map((item, i) =>
            <Breadcrumb.Item
              key={ item }
              href={ fromPath(path.slice(0, i + 1)) }
              active={ i === path.length - 1 }>
              { startCase(item) }
            </Breadcrumb.Item>
          ) }
        </Breadcrumb>
      </Col>
      <Col md={ 2 }>
        <Button
          block
          bsStyle="info"
          disabled={ !hasChanged || isSaving }
          onClick={ () => dispatch(saveData(config.gitJsonApi)) }>
          { isSaving ? "Saving..." : "Save" }
        </Button>
      </Col>
    </Row>
  )
}
