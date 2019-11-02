import { Memory } from './Memory.js'
import { chat } from './Chat.js'

// Memory(4, 4, 'memoryContainer')

// Memory(2, 2, 'memoryContainer')

// Memory(2, 4, 'memoryContainer')
const bar = document.querySelector('#nav-mobile')
export function handleClick () {
  console.log()
  bar.addEventListener('click', (event) => {
    switch (event.target.id) {
      case 'chat':
        chat()
        console.log('Chat')
        break
      case 'MG' :
        Memory(2, 2, 'memoryContainer')
        console.log('MG')
        break
    }
  })
}
handleClick()
// chat()
