import React from 'react'
import './chat.css'
import Draggable from 'react-draggable' // The default
// import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
export default class Chat extends React.Component {
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
          <div className='header'> Live Chat <button className='close'>x</button></div>
          <div className='body'> Todo Live Chat <div> Lorem ipsum </div></div>
        </div>
      </Draggable>

    )
  }
}
