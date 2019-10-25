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
    // switch (compName.target.id) {
    //   case 'c': clickedIcons.push(<Chat appID={'c' + this.state.key} />)
    //     console.log('Chat')
    //     console.log(<Chat appID={'c' + this.state.key} />)
    //     break
    //   case 'MG' : clickedIcons.push(<MemoryGame appID={'MG' + this.state.key} />)
    //     console.log('MemoryGame')
    //     console.log(<MemoryGame appID={'MG' + this.state.key} />)
    //     break
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
