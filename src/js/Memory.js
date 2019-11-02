export function Memory (rows, cols, container) {
  let a
  const imgContainer = document.querySelector(`#${container}`)
  let tiles = []
  let turn1
  let turn2
  let lastTile
  tiles = getPictureArray(rows, cols)
  const template = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
  tiles.forEach(function (element, index) {
    a = document.importNode(template, true)
    imgContainer.appendChild(a)
    a.addEventListener('click', function (event) {
      const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      turnBrick(element, index, img)
    })

    if ((index + 1) % cols === 0) {
      imgContainer.appendChild(document.createElement('br'))
    }
  })
  function turnBrick (tile, index, img) {
    img.src = `../image/${tile}.png`

    if (!turn1) {
      turn1 = img
      lastTile = tile
    } else {
      turn2 = img
      if (tile === lastTile) {
        console.log('pair!')
      } else {
        turn1.src = '../image/0.png'
        turn2.src = '../image/0.png'
      }
      turn1 = null
      turn2 = null
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
}
