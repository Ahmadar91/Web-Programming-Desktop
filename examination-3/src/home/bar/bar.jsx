import React from 'react'
// import Icons from '../icons/icons'
import './bar.css'
// import Chat from '../../chat/chat'
// import MemoryGame from '../../MemoryGame/MemoryGame'
import Icons from '../icons/icons'

// class Buttons extends React.Component {
//   constructor () {
//     super()
//     this.state = { render: '' }
//   }

//   handleClick (compName, e) {
//     console.log(compName)
//     this.setState({ render: compName })
//   }

//   _renderSubComp () {
//     switch (this.state.render) {
//       case 'Chat': return <Chat />
//       case 'MemoryGame' : return <MemoryGame />
//     }
//   }

//   render () {
//     return (
//       <div className='App'>
//         <ul style={{ display: 'inline' }}>
//           <li onClick={this.handleClick.bind(this, 'Chat')}>Chat</li>
//           <li onClick={this.handleClick.bind(this, 'MemoryGame')}>MemoryGame</li>
//         </ul>
//         {this._renderSubComp()}
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'))
export default class Bar extends React.Component {
  render () {
    return (
      <div className='bar'>

        {/* <Buttons /> */}
        <Icons s name='Chat' />
        <Icons name='Memory Game' />
      </div>
    )
  }
}
