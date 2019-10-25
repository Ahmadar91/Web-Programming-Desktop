import React from 'react'
import './game.css'
import Draggable from 'react-draggable' // The default
export default class MemoryGame extends React.Component {
  render () {
    return (
      <Draggable>

        <div className='window' id={this.props.appID}>
          <div className='header'> Live Chat <button className='close' onClick={this.close.bind(this)}>x</button></div>
          <div className='body'> Todo Live Chat <div> Lorem ipsum </div></div>
        </div>

      </Draggable>
    )
  }
}
