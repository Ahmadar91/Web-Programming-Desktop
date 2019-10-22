import React from 'react'
import Bar from './bar/bar'
import './home.css'
import Chat from '../chat/chat'
// import Chat from '../chat/chat'
// import MemoryGame from '../MemoryGame/MemoryGame'
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
//       // case 'Calculater': return <FRings />
//     }
//   }

//   render () {
//     return (
//       <div className='App'>
//         <ul style={{ display: 'inline' }}>
//           <li onClick={this.handleClick.bind(this, 'Chat')}>Chat</li>
//           <li onClick={this.handleClick.bind(this, 'MemoryGame')}>MemoryGame</li>
//           {/* <li onClick={this.handleClick.bind(this, 'Calculater')}>Calculater</li> */}
//         </ul>
//         {this._renderSubComp()}
//       </div>
//     )
//   }
// }

export default class Home extends React.Component {
  render () {
    return (
      <div className='home'>

        <Bar />
        <Chat />
        {/* <Buttons /> */}
      </div>
    )
  }
}
