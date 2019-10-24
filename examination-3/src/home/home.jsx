import React from 'react'
import Bar from './bar/bar'
import './home.css'
import Chat from '../chat/chat'
import MemoryGame from '../MemoryGame/MemoryGame'
import Desktop from './desktop'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      render: '',
      arr: [],
      key: 0
    }
  }

  handleClick (compName) {
    console.log(compName)
    if (compName.target.tagName === 'li') {
      compName.target.id = compName.target.parentElement.id
    }
    this.setState({ render: compName })
    const clickedIcons = this.state.arr
    switch (compName.target.id) {
      case 'c': clickedIcons.push(<Chat key={'c' + this.state.id} />)
        console.log('Chat')
        console.log(<Chat key={'c' + this.state.id} />)
        console.log(<Chat key={'c' + this.state.id} />)
        break
      case 'MG' : clickedIcons.push(<MemoryGame key={'MG' + this.state.id} />)
        console.log('MemoryGame')
        console.log(<MemoryGame key={'MG' + this.state.id} />)
        break
    }
    this.setState({
      key: this.state.key + 1,
      arr: clickedIcons
    })
    console.log(this.state.arr)
  }

  render () {
    return (
      <div className='home'>
        <Bar handleClick={this.handleClick.bind(this)} />
        {/* {this._renderSubComp()} */}
        <Desktop arr={this.state.arr} />
      </div>
    )
  }
}
