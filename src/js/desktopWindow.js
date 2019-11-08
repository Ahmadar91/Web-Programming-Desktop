export default class DesktopWindow {
  constructor () {
    this.windowContainer = document.querySelector('.windowContainer')
    this.windowDiv = document.querySelectorAll('.windowContainer template')[0].content.firstElementChild
    this.window = document.importNode(this.windowDiv, true)
    this.windowContainer.appendChild(this.window)
    // this.addEvents()
  }

  // moveStart (e) {
  //   document.querySelectorAll('.window').forEach((window) => {
  //     window.style.zIndex = -1
  //   })
  //   this.style.zIndex = 5
  //   this.isClicked = true
  //   this.positions = [this.offsetLeft - e.clientX,
  //     this.offsetTop - e.clientY]
  // }

  // moveDragOver () {
  //   this.isClicked = false
  // }

  // moveDrop (e) {
  //   if (this.isClicked) {
  //     this.position = {
  //       x: e.clientX,
  //       y: e.clientY
  //     }
  //     this.style.left = (this.position.x + this.positions[0]) + 'px'
  //     this.style.top = (this.position.y + this.positions[1]) + 'px'
  //   }
  // }

  // addEvents () {
  //   this.window.addEventListener('mousedown', this.moveStart, true)
  //   this.window.addEventListener('mouseup', this.moveDragOver, true)
  //   this.window.addEventListener('mousemove', this.moveDrop, true)
  //   this.closeWindowButton.addEventListener('click', () => {
  //     this.window.remove()
  //   })
  // }
  getClose () {
    return this.closeWindowButton
  }

  getWindow () {
    return this.window
  }
}
