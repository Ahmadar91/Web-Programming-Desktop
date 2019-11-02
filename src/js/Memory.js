export function Memory (rows, cols, container) {
  let img
  const imgContainer = document.querySelector('#' + container)
  let index
  for (index = 0; index < rows * cols; index++) {
    img = document.createElement('img')
    img.setAttribute('src', '../image/0.png')
    imgContainer.appendChild(img)
  }
  img = document.createElement('img')
  img.setAttribute('src', '../image/0.png')
  if (index + 1 % cols === 0) {
    document.appendChild(document.createElement('br'))
  }
}
\