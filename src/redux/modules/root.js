import {Machine} from '@clarify/goose-module'


const reducer = Machine({
  // [action] : state-transformation
})


const saga = function*(){
  // side effects go here
}

// This is the root module. It's loaded by default
export default {
  root: true, // this module is mounted at the store root, not under a module key
  key: 'root', // Identifies this module to goose
  reducer,
  saga,
  dependencies:[] // Other modules will get loaded if provided here
}