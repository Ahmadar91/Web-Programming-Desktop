export default class DesktopWindow {
  constructor () {
    this.windowContainer = document.querySelector('.windowContainer')
    this.windowDiv = document.querySelectorAll('.windowContainer template')[0].content.firstElementChild
    this.window = document.importNode(this.windowDiv, true)
    console.log(this.window)
    this.container.appendChild(this.window)
  }

  dragAndDrop () {
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
}
