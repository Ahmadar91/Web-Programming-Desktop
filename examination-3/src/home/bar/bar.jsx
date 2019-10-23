import React from 'react'

import './bar.css'

export default class Bar extends React.Component {
  render () {
    return (
      <div className='bar'>
        <ul style={{ display: 'inline' }}>
          <li onClick={this.props.handleClick.bind(this, 'Chat')}>Chat</li>
          <li onClick={this.props.handleClick.bind(this, 'MemoryGame')}>MemoryGame</li>
        </ul>

      </div>
    )
  }
}
