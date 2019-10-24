import React from 'react'
import './chat.css'
import Draggable from 'react-draggable' // The default
// import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
export default class Chat extends React.Component {
  render () {
    return (
      <Draggable>
        <div id='window' className='handle'>
          <div className='header'> Live Chat <button className='close'>x</button></div>
          <div className='body'> Todo Live Chat <div> Lorem ipsum </div></div>
        </div>
      </Draggable>

    )
  }
}
