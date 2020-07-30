import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import logo from './logo.png';
import './App.css';
import { UppyProvider, UppyFactory, useUppyContext } from './UppyContext';
import Uppy from '@uppy/core';
import DragDrop, { DragDropOptions } from '@uppy/drag-drop';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';

const User = () => {
  const target = useRef<HTMLDivElement>();
  const uppy = useUppyContext();
  useEffect(() => {
    uppy.use<DragDropOptions, DragDrop>(DragDrop, {
      target: target.current,
      width: '100%',
      height: '100%',
    });
  }, []);

  return <div ref={target}>does this add a plugin?</div>;
};

function App() {
  const init: UppyFactory = () => {
    const uppy = Uppy();
    return uppy;
  };
  return (
    <UppyProvider initialize={init}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://preactjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Preact
          </a>
        </header>
      </div>
      <User />
    </UppyProvider>
  );
}

export default App;
