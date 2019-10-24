import React from 'react'
import './game.css'
import Draggable from 'react-draggable' // The default
export default class MemoryGame extends React.Component {
  render () {
    return (
      <Draggable
        axis='both'
        handle='.handle'
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div id='window' className='handle'>
          <div className='header'>  Memory Game <button className='close'>x</button></div>
          <div className='body'> ToDo memoryGame <div> Lorem ipsum </div></div>
        </div>
      </Draggable>
    )
  }
}
