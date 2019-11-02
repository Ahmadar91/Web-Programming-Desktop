export function Memory (rows, cols, container) {
  let img
  const imgContainer = document.querySelector(`#${container}`)
  let tiles = []
  tiles = getPictureArray(rows, cols)
  const template = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
  tiles.forEach(function (element, index) {
    img = document.importNode(template, true)
    imgContainer.appendChild(img)
    img.addEventListener('click', function () {
      console.log(index)
    })

    if ((index + 1) % cols === 0) {
      imgContainer.appendChild(document.createElement('br'))
    }
  })

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
