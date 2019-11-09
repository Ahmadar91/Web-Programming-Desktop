import DesktopWindow from './desktopWindow.js'
export default class Memory {
  constructor () {
    const DtWindow = new DesktopWindow()
    console.log(DtWindow)
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    // this.closeWindowButton = DtWindow.getClose()
    DtWindow.window.classList.add('GrayBackGround')
    console.log(this.closeWindowButton)
    this.createMemory(DtWindow.window)
    // this.MemoryGame(4, 4, DtWindow.window)
    this.addEvents(DtWindow.window)
  }

  changeMemory (dt, old) {
    const changeArrayButton = document.createElement('button')
    changeArrayButton.textContent = 'Change Size'
    changeArrayButton.className = 'UserNameButton'
    dt.firstElementChild.appendChild(changeArrayButton)
    changeArrayButton.addEventListener('click', () => {
      changeArrayButton.remove()
      this.createMemory(dt)
      old.remove()
    })
  }

  // win (dt, old, tries) {
  //   const h1 = document.createElement('H1')
  //   h1.textContent = 'You Won! number of tries: ' | +tries
  //   this.DtWindow.window.appendChild('h1')
  //   old.remove()
  //   this.createMemory(dt, h1)
  // }

  createMemory (dt, h1) {
    if (h1 !== undefined) {
      h1.remove()
    }
    const templateDiv = document.querySelectorAll('.OptionContainer template')[0].content.firstElementChild
    // console.log(templateDiv)

    const ulDiv = document.importNode(templateDiv, true)

    dt.appendChild(ulDiv)
    const ul = document.querySelector('.ul')
    ul.addEventListener('click', (e) => {
      switch (e.target.id) {
        case '2X2':
          ulDiv.remove()
          this.MemoryGame(2, 2, dt)
          console.log('2X2')

          break
        case '2X4' :
          ulDiv.remove()
          this.MemoryGame(2, 4, dt)
          console.log('2x4')

          break
        case '4X4' :
          ulDiv.remove()
          this.MemoryGame(4, 4, dt)
          console.log('4x4')

          break
      }
    })
  }

  MemoryGame (rows, cols, container) {
    let a
    // const imgContainer = document.querySelector(`.${container}`)
    let tiles = []
    let turn1
    let turn2
    let lastTile
    let pairs = 0
    let tries = 0
    tiles = this.getPictureArray(rows, cols)
    const templateDiv = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
    const div = document.importNode(templateDiv, false)
    // const windowDiv = document.importNode(div.content, true)
    console.log(div)
    console.log(container)
    container.appendChild(div)
    this.MemoryContainer = div
    console.log(this.MemoryContainer)
    this.changeMemory(container, div)
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
      turnBrick(tiles[index], img)
    })

    // imgContainer.appendChild(windowDiv)
    // windowDiv.appendChild(div)

    function turnBrick (tile, img) {
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
        console.log(tries)

        turn2 = img

        if (tile === lastTile) {
          console.log('pair!')
          pairs++
          if (pairs === (rows * cols) / 2) {
            console.log('Won! Number of tries: ' + tries)
            // this.win(container, div, tries)
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

  moveStart (e) {
    document.querySelectorAll('.window').forEach((window) => {
      window.style.zIndex = -1
    })
    this.style.zIndex = 5
    this.isClicked = true
    this.positions = [this.offsetLeft - e.clientX,
      this.offsetTop - e.clientY]
  }

  moveDragOver () {
    this.isClicked = false
  }

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

  addEvents (DtWindow) {
    DtWindow.addEventListener('mousedown', this.moveStart, true)
    DtWindow.addEventListener('mouseup', this.moveDragOver, true)
    DtWindow.addEventListener('mousemove', this.moveDrop, true)
    this.closeWindowButton.addEventListener('click', () => {
      DtWindow.remove()
    })
  }
}

/*
// export default class Memory {

// }
import DesktopWindow from './desktopWindow.js'
export function Memory (rows, cols, container) {
  let a
  // const imgContainer = document.querySelector(`.${container}`)
  let tiles = []
  let turn1
  let turn2
  let lastTile
  let pairs = 0
  let tries = 0
  tiles = getPictureArray(rows, cols)
  const templateDiv = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
  const div = document.importNode(templateDiv, false)
  // const windowDiv = document.importNode(div.content, true)
  const dtWindow = new DesktopWindow()
  dtWindow.window.appendChild(div)
  tiles.forEach(function (element, index) {
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
    turnBrick(tiles[index], index, img)
  })

  // imgContainer.appendChild(windowDiv)
  // windowDiv.appendChild(div)

  function turnBrick (tile, index, img) {
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
      console.log(tries)

      turn2 = img

      if (tile === lastTile) {
        console.log('pair!')
        pairs++
        if (pairs === (rows * cols) / 2) {
          console.log('Won! Number of tries: ' + tries)
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
function getPictureArray (rows, cols) {
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

 */
