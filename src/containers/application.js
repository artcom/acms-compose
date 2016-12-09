import React from "react"
import { connect } from "react-redux"

export default connect(mapStateToProps)(Application)

function mapStateToProps(state) {
  return state
}

function Application({ children }) {
  return (
    <div>
      <h1>Application</h1>
      { children }
    </div>
  )
}
