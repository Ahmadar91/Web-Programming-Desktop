import DesktopWindow from './desktopWindow.js'
/**
 *
 *
 * @export
 * @class Memory
 */
export default class Memory {
  /**
   *Creates an instance of Memory.
   * @memberof Memory
   */
  constructor () {
    const DtWindow = new DesktopWindow()
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    DtWindow.window.classList.add('whiteBackGround')
    this.createMemory(DtWindow.window)
    this.addEvents(DtWindow.window)
  }

  /**
   *
   *
   * @param {*} dt
   * @param {*} old
   * @param {*} win
   * @memberof Memory
   */
  changeMemory (dt, old, win) {
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    const icon = document.createElement('i')
    icon.setAttribute('class', 'material-icons md-light black')
    icon.textContent = 'settings'
    a.appendChild(icon)
    a.classList.add('UserNameButton')
    dt.firstElementChild.appendChild(a)
    icon.addEventListener('click', () => {
      icon.remove()
      a.remove()
      this.createMemory(dt)
      old.remove()
      win.remove()
    })
  }

  /**
   *
   *
   * @param {*} dt
   * @param {*} h1
   * @memberof Memory
   */
  createMemory (dt, h1) {
    if (h1 !== undefined) {
      h1.remove()
    }
    const templateDiv = document.querySelectorAll('.OptionContainer template')[0].content.firstElementChild
    const ulDiv = document.importNode(templateDiv, true)
    dt.appendChild(ulDiv)
    const ul = document.querySelector('.ul')
    ul.addEventListener('click', (e) => {
      switch (e.target.id) {
        case '2X2':
          ulDiv.remove()
          this.MemoryGame(2, 2, dt)
          break
        case '2X4' :
          ulDiv.remove()
          this.MemoryGame(2, 4, dt)
          break
        case '4X4' :
          ulDiv.remove()
          this.MemoryGame(4, 4, dt)
          break
      }
    })
  }

  /**
   *
   *
   * @param {*} rows
   * @param {*} cols
   * @param {*} container
   * @memberof Memory
   */
  MemoryGame (rows, cols, container) {
    let a
    let tiles = []
    let turn1
    let turn2
    let lastTile
    let pairs = 0
    let tries = 0
    tiles = this.getPictureArray(rows, cols)
    const templateDiv = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
    const div = document.importNode(templateDiv, false)
    const win = document.createElement('H3')
    win.classList.add('win')
    container.appendChild(div)
    this.MemoryContainer = div
    this.changeMemory(container, div, win)
    tiles.forEach((element, index) => {
      a = document.importNode(templateDiv.firstElementChild, true)
      a.firstElementChild.setAttribute('data-brickNumber', index)
      div.appendChild(a)
      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('click', function (event) {
      event.preventDefault()
      const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      const index = parseInt(img.getAttribute('data-brickNumber'))
      turnBrick(tiles[index], img, container, win, div)
    })

    function turnBrick (tile, img, container, win, div) {
      if (turn2) {
        return
      }
      img.src = `../image/${tile}.png`
      if (!turn1) {
        turn1 = img
        lastTile = tile
      } else {
        if (img === turn1) {
          return
        }
        tries += 1
        turn2 = img
        if (tile === lastTile) {
          pairs++
          if (pairs === (rows * cols) / 2) {
            win.textContent = 'You Win! Number of tries: ' + tries
            container.appendChild(win)
            div.remove()
          }
          setTimeout(() => {
            turn1.parentElement.classList.add('remove')
            turn2.parentElement.classList.add('remove')
            turn1 = null
            turn2 = null
          }, 300)
        } else {
          setTimeout(() => {
            turn1.src = '../image/0.png'
            turn2.src = '../image/0.png'
            turn1 = null
            turn2 = null
          }, 500)
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} rows
   * @param {*} cols
   * @returns
   * @memberof Memory
   */
  getPictureArray (rows, cols) {
    let index
    const arr = []
    for (index = 1; index <= (rows * cols) / 2; index += 1) {
      arr.push(index)
      arr.push(index)
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Memory
   */
  moveStart (e) {
    document.querySelectorAll('.window').forEach((window) => {
      window.style.zIndex = -1
    })
    this.style.zIndex = 5
    this.isClicked = true
    this.positions = [this.offsetLeft - e.clientX,
      this.offsetTop - e.clientY]
  }

  /**
   *
   *
   * @memberof Memory
   */
  moveDragOver () {
    this.isClicked = false
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Memory
   */
  moveDrop (e) {
    if (this.isClicked) {
      this.position = {
        x: e.clientX,
        y: e.clientY
      }
      this.style.left = (this.position.x + this.positions[0]) + 'px'
      this.style.top = (this.position.y + this.positions[1]) + 'px'
    }
  }

  /**
   *
   *
   * @param {*} DtWindow
   * @memberof Memory
   */
  addEvents (DtWindow) {
    DtWindow.addEventListener('mousedown', this.moveStart, true)
    DtWindow.addEventListener('mouseup', this.moveDragOver, true)
    DtWindow.addEventListener('mousemove', this.moveDrop, true)
    this.closeWindowButton.addEventListener('click', () => {
      DtWindow.remove()
    })
  }
}
