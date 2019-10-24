import React from 'react'

import './bar.css'

export default class Bar extends React.Component {
  render () {
    return (
      <nav className='bar'>
        <ul style={{ display: 'inline' }} onClick={this.props.handleClick}>
          <li id='c'>Chat</li>
          <li id='MG'>MemoryGame</li>
        </ul>
      </nav>
    )
  }
}
