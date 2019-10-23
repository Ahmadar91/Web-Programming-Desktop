import React from 'react'
import Bar from './bar/bar'
import './home.css'
import Chat from '../chat/chat'
import MemoryGame from '../MemoryGame/MemoryGame'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = { render: '' }
  }

    handleClick = (compName, e) => {
    console.log(compName)
    this.setState({ render: compName })
  }

  _renderSubComp () {
    switch (this.state.render) {

      // use window and insert chat inside of it
      case 'Chat': return <Chat />
      case 'MemoryGame' : return <MemoryGame />
    }
  }

  render () {
    return (
      <div className='home'>


        <Bar handleClick={this.handleClick} />
        {this._renderSubComp()}
  
      </div>
    )
  }
}
