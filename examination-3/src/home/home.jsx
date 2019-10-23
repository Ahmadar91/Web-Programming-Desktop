import React from 'react'
import Bar from './bar/bar'
import './home.css'
import Chat from '../chat/chat'
import MemoryGame from '../MemoryGame/MemoryGame'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      render: '', 
    arr : [
    ],
    key: 1     
  }
}

    handleClick = (compName, e) => {
    console.log(compName)
    this.setState({ render: compName })
    let clickedIcons = this.state.arr
    switch (this.state.render) {
      case 'Chat': clickedIcons.push(<Chat />) 
      break
      case 'MemoryGame' : clickedIcons.push(<MemoryGame />) 
      break
      
  }
  this.setState({
    arr: clickedIcons
  })
  console.log(this.state.arr);
  
}

  _renderSubComp () {
    
  
     return this.state.arr
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
