import { Memory } from './Memory.js'
import { chat } from './Chat.js'

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

function dragAndDrop () {
  let myX = ''
  let myY = ''
  let selector = ''

  function resetZ () {
    const elements = document.querySelectorAll('.window')
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].style.zIndex = 5
    }
  }

  function moveStart (e) {
    selector = e.target
    myX = e.offsetX === undefined ? e.layerX : e.offsetX
    myY = e.offsetY === undefined ? e.layerY : e.offsetY
    resetZ()
    selector.style.zIndex = 10
  }

  function moveDragOver (e) {
    e.preventDefault()
  }

  function moveDrop (e) {
    e.preventDefault()
    selector.style.left = e.pageX - myX + 'px'
    selector.style.top = e.pageY - myY + 'px'
  }

  document.querySelector('body').addEventListener('dragstart', moveStart, false)
  document.querySelector('body').addEventListener('dragover', moveDragOver, false)
  document.querySelector('body').addEventListener('drop', moveDrop, false)
}
dragAndDrop()
