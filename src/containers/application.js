import Immutable from "immutable"
import startCase from "lodash/startCase"
import React from "react"
import { Breadcrumb, Button, Col, Grid, Row } from "react-bootstrap"
import { connect } from "react-redux"

import { fromPath } from "../hash"

export default connect(mapStateToProps)(Application)

function mapStateToProps(state) {
  return {
    hasChanges: !Immutable.is(state.originalContent, state.changedContent),
    loading: state.originalContent === null,
    path: state.path
  }
}

function Application({ children, hasChanges, loading, path }) {
  if (loading) {
    return null
  }

  return (
    <Grid style={ { marginTop: "15px" } }>
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
          <Button block disabled={ !hasChanges } bsStyle="primary">Save</Button>
        </Col>
      </Row>
      { children }
    </Grid>
  )
}
