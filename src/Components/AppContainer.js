import React from 'react'

import {connect} from 'react-redux'
import Component from './App'

export default connect(
  state => ({everything:state})
)(Component)
