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
    arr : [],
    key: 0     
  }
}

    handleClick = (compName) => {
    console.log(compName)
    this.setState({ render: compName })
    let clickedIcons = this.state.arr
    switch (this.state.render) {
      case 'Chat': clickedIcons.push(<Chat key={'c' + this.state.id} />) 
      console.log('Chat')
      console.log(<Chat key={'c' + this.state.id} />)
      console.log(<Chat key={'c' + this.state.id} />)
      break
      case 'MemoryGame' : clickedIcons.push(<MemoryGame key={'MG'+this.state.id} />) 
      console.log('MemoryGame')
      console.log(<MemoryGame key={'MG'+this.state.id} />)
      break
      
  }
  this.setState({
    key: this.state.key + 1,
    arr: clickedIcons
  })
  console.log(this.state.arr);
  
}
  
  render () {
    return (
      <div className='home'>
        <Bar handleClick={this.handleClick} />
        {/* {this._renderSubComp()} */}
       {this.state.arr.map((child, index)=>(
          <div key={index}>{child}</div>
        ))} 
      </div>
    )
  }
}
