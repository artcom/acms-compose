import React from "react"
import { connect } from "react-redux"

export default connect(mapStateToProps)(EntityList)

function mapStateToProps(state) {
  return state
}

function EntityList() {
  return <h1>Entities</h1>
}
