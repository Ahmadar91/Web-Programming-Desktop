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
        console.log(chat)
        break
      }

      case 'MG' : {
        const memory = new Memory()
        console.log(memory)
        break
      }

      case 'music' : {
        const musicPlayer = new Player()
        console.log(musicPlayer)
        break
      }
    }
  })
}
handleClick()
