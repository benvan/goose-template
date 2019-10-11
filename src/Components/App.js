import React, { Component, useEffect, useState, Suspense } from 'react';
import './App.css';

const delay = (t) => (x) => new Promise(r => setTimeout(r.bind(null,x),t))


// Simluate network delay for loading new webpack chunks
const Foo = React.lazy(() => import('./Foo').then(delay(1500)));
const Bar = React.lazy(() => import('./Bar').then(delay(1500)));

const LazyLoadedModuleControl = ({name,children}) => {
  const [hasBeenClicked,click] = useState(false)
  return (
    <div className="module-line">
      {!hasBeenClicked
        ?<button onClick={click}>Click me to load {name}</button>
        :(
          <Suspense fallback={'loading ('+name+') webpack chunk'}>
            <div>({name}) webpack chunk loaded</div>
            {children}
          </Suspense>
        )
      }
    </div>
  )
}

class App extends Component {
  
  render() {
    const {everything} = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1>Asynchronous module demo</h1>
        </header>
        <LazyLoadedModuleControl name="Foo Component">
          <small>I'm just some text, but since I'm inside a Suspense, I waited for my brother Foo to be ready</small>
          <Foo/>
        </LazyLoadedModuleControl>
  
        <LazyLoadedModuleControl name="Another Foo Component">
          <Foo/>
          
          <small>
            <div>This load should have been instantaneous if we already loaded Foo somewhere...</div>
            <div>(also, Foo probably already had data inside it - handy)</div>
          </small>
        </LazyLoadedModuleControl>
  
        <LazyLoadedModuleControl name="Bar Component">
          <Bar/>
        </LazyLoadedModuleControl>
  
        <div>
          <p>Current store:</p>
          <pre>{JSON.stringify(everything, null, 4)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
