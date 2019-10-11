import React from 'react'

import {compose} from 'redux'
import {withModule} from '@metomic/goose-module'
import {connect} from 'react-redux'

import FooModule from '../redux/modules/Foo.js'

const FooComponent = ({foos=[]}) => (
  <div className="foo">
    <b>I'm Foo (Component):</b>
    <div>My data: ({foos.length ? foos.join(',')  : 'waiting for data'})</div>
  </div>
)

export default compose(
  withModule(FooModule),
  connect(state => ({
    foos: state.Foo.foos
  }))
)(FooComponent)

