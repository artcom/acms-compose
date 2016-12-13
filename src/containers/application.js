import React from "react"
import { Button, Grid, Navbar, Row } from "react-bootstrap"
import { connect } from "react-redux"

export default connect(mapStateToProps)(Application)

function mapStateToProps(state) {
  return {
    loading: state.content === null
  }
}

function Application({ children, loading }) {
  return (
    <Grid>
      <Row>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Exhibition</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <Button>Save</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      { !loading && children }
    </Grid>
  )
}
