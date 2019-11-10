import Memory from './Memory.js'
import Chat from './Chat.js'
import player from './player.js'

// Memory(4, 4, 'memoryContainer')

// Memory(2, 2, 'memoryContainer')

const bar = document.querySelector('#nav-mobile')
export function handleClick () {
  console.log()

  bar.addEventListener('click', (event) => {
    event.preventDefault()
    switch (event.target.id) {
      case 'chat':
        new Chat()
        console.log('Chat')
        break
      case 'MG' :
        new Memory()
        console.log('MG')
        break
      case 'music' :
        new player()
        console.log('music')
        break
    }
  })
}
handleClick()
