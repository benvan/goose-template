import React from 'react'

import {compose} from 'redux'
import {withModule} from '@metomic/goose-module'
import {connect} from 'react-redux'

import BarModule,{
  incrementBar
} from '../redux/modules/Bar.js'

const BarComponent = ({foos=[],fooReady,number, increment}) => (
  <div className="bar">
    <b>I'm a Bar</b>
    <div>
      <div>Bar number: {number}</div>
      <small>I'll ask the Foo module for more foos every 5 ticks</small>
      <button onClick={() => increment()}>increment bar number</button>
    </div>
    
    
    <div className="bar-foo">
      <div style={{background:'#00000077', margin: 4, padding: 4}}>
        {!fooReady ? 'Also waiting for Foo (Module) to be ready' : 'And Foo (Module) is also ready'}
      </div>
      <small>
        <div>But since the Bar module depends on the Foo module, I also happen to know that Foo has:</div>
      </small>
      <div style={{marginTop:12}}>({foos.length ? foos.join(',')  : 'waiting for data'})</div>
    </div>
    

  </div>
)

export default compose(
  withModule(BarModule),
  connect(state => ({
    foos: state.Foo.foos,
    fooReady: Boolean(state.Foo.firstBecameReadyAt),
    number: state.Bar.number
  }),{
    increment: incrementBar
  })
)(BarComponent)

