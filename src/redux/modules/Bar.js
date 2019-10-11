import {Machine} from '@metomic/goose-module'
import {updates} from 'fn-update'
import {call, put, takeLatest, select, all} from "redux-saga/effects";
import FooModule,{
  generateFoos
} from './Foo'

const INCREMENT_BAR = 'INCREMENT_BAR'
export const incrementBar = () => ({ type: INCREMENT_BAR })

const reducer = Machine({
  [Machine.INIT]: () => ({
    gotLoadedAt: new Date().toLocaleTimeString(),
    number: 0
  }),
  [INCREMENT_BAR]: () => updates({
    gotIncrementedAt: new Date().toLocaleTimeString(),
    number: b => b+1,
  })
})


const saga = function*(){
  yield all([
    takeLatest(INCREMENT_BAR, function*(){
      /** If our number hits a multiple of 5, let's ask Foo to generate some more foos */
      const number = yield select(state => state.Bar.number)
      if (number % 5 === 0){
        yield put(generateFoos())
      }
    })
  ])
}

export default {
  key: 'Bar', // Identifies this module to goose
  reducer,
  saga,
  dependencies:[FooModule] // Other modules will get loaded if provided here
}