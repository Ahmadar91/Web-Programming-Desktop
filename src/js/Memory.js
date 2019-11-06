// export default class Memory {

// }
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
  const Window = document.querySelector('#windowContainer template')
  console.log(Window)
  const windowDiv = document.importNode(Window.content, true)
  console.log(windowDiv)
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

  const desktop = document.querySelector('body')
  desktop.appendChild(windowDiv)

  const body = document.querySelector('.body')
  console.log(body)
  body.appendChild(div)
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
