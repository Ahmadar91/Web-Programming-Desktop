import Memory from './Memory.js'
import Chat from './Chat.js'
import Player from './player.js'

// Memory(4, 4, 'memoryContainer')

// Memory(2, 2, 'memoryContainer')

const bar = document.querySelector('#nav-mobile')
export function handleClick () {
  console.log()

  bar.addEventListener('click', (event) => {
    event.preventDefault()
    switch (event.target.id) {
      case 'chat': {
        const chat = new Chat()
        chat()
        console.log('Chat')
        break
      }

      case 'MG' : {
        const memory = new Memory()
        memory()
        console.log('MG')
        break
      }

      case 'music' : {
        const musicPlayer = new Player()
        musicPlayer()
        console.log('music')
        break
      }
    }
  })
}
handleClick()
