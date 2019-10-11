import {Machine} from '@metomic/goose-module'
import {updates} from 'fn-update'
import {call, put, takeLatest,all} from "redux-saga/effects";
const delay = (t) => (x) => new Promise(r => setTimeout(r.bind(null,x),t))

const simulateSlowApiToGenerateFoos = () => {
  const rand = (n) => Math.floor(Math.random()*n)
  return Promise.resolve(
    Array(rand(5)+1).fill(0).map(_ => 'ABCDEFGHIJ'.split('')[rand(10)])
  ).then(delay(1500))
}

const GENERATE_FOOS = 'GENERATE_FOOS'
const FOOS_GENERATED = 'FOOS_GENERATED'

export const generateFoos = () => ({ type: GENERATE_FOOS })
const foosGenerated = (foos) => ({ type: FOOS_GENERATED, payload:{foos} })

const reducer = Machine({
  [Machine.INIT]: () => ({
    gotLoadedAt: new Date().toLocaleTimeString(),
    foos: []
  }),
  [FOOS_GENERATED]: ({payload:{foos}}) => updates({
    firstBecameReadyAt: t => t || new Date().toLocaleTimeString(),
    foosWereGeneratedAt: new Date().toLocaleTimeString(),
    foos: foos,
  }),
  [GENERATE_FOOS]: () => updates({
    requestForMoreFoosLastHappendAt: new Date().toLocaleTimeString(),
    foos: fs => fs.length ? [...fs, 'gonna load more'] : fs
  }),
})


const saga = function*(){
  
  yield all([
    takeLatest(GENERATE_FOOS, function*(){
      // Note - in practice you'd want something to handle asynchronous actions more gracefully than this,
      // but that lies outside the scope of this example
      const result = yield call(simulateSlowApiToGenerateFoos)
      yield put(foosGenerated(result))
    })
  ])
  
  // Kick off foos being generated on module load.
  yield put(generateFoos())
}

export default {
  key: 'Foo', // Identifies this module to goose
  reducer,
  saga,
  dependencies:[] // Other modules will get loaded if provided here
}