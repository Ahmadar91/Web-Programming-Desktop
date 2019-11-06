import { Memory } from './Memory.js'
import { chat } from './Chat.js'
import DesktopWindow from './desktopWindow.js'

// Memory(4, 4, 'memoryContainer')

// Memory(2, 2, 'memoryContainer')

// Memory(2, 4, 'memoryContainer')
const bar = document.querySelector('#nav-mobile')
export function handleClick () {
  console.log()
  let cId = 0
  bar.addEventListener('click', (event) => {
    switch (event.target.id) {
      case 'chat':
        chat('c' + cId)
        console.log('Chat')
        cId++
        break
      case 'MG' :
        Memory(2, 2, 'body')
        console.log('MG')
        break
    }
  })
}
handleClick()
// chat()

const window = new DesktopWindow()
