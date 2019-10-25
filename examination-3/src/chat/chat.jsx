import React from 'react'
import './chat.css'
import Draggable from 'react-draggable' // The default
// import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
export default class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      highestIndex: 0
    }
  }

  onStart (e) {
    const elements = document.getElementsByClassName('react-draggable')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.zIndex = 1
      e.currentTarget.style.zIndex = 2
    }
  }

  render () {
    return (
      <Draggable>

        <div className='window' id={this.props.appID}>
          <div className='header'> Live Chat {' ' + this.props.appID} <button className='close' onClick={this.close.bind(this)}>x</button></div>
          <div className='body'> Todo Live Chat <div> Lorem ipsum </div></div>
        </div>

      </Draggable>

    )
  }
}
