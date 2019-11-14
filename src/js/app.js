import Memory from './Memory.js'
import Chat from './Chat.js'
import Player from './player.js'

const bar = document.querySelector('#nav-mobile')
/**
 * Nav bar event handler
 */
function handleClick () {
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
