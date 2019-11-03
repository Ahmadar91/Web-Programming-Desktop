
export function chat (id) {
  console.log(id)

  const Window = document.querySelector('#windowContainer template')

  const windowDiv = document.importNode(Window.content, true)
  // figure out how to create multiply Windows and send message to each window\
  // const windowDiv2 = document.importNode(Window.content, true)
  // const windowDiv3 = document.importNode(Window.content, true)

  const messageTemplate = document.querySelector('#message-container template')
  console.log(messageTemplate)
  const messageDiv = document.importNode(messageTemplate.content, true)
  console.log(messageDiv)
  const templateDiv = document.querySelectorAll('#ChatContainer template')[0].content.firstElementChild

  const chatDiv = document.importNode(templateDiv, true)
  console.log(chatDiv)
  const desktop = document.querySelector('body')
  desktop.appendChild(windowDiv)
  // desktop.appendChild(windowDiv2)
  // desktop.appendChild(windowDiv3)
  const windowID = document.querySelector('.window')
  windowID.setAttribute('id', id)
  const WindowBody = document.querySelector('.body')
  console.log(WindowBody)
  WindowBody.appendChild(chatDiv)
  const chatContainer = document.querySelector('.chat-container')
  const textBox = document.querySelector('#textBox')
  const button = document.querySelector('#button')
  const closeButton = document.querySelector('.close')
  button.addEventListener('click', () => {
    sendText()
    textBox.value = ''
  })
  closeButton.addEventListener('click', e => {
    socket.close()
    desktop.removeChild(e.target.parentNode.parentNode)
  })
  const socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')

  function sendText () {
    if (textBox.value === '') {
      return
    }
    const msg = {
      type: 'message',
      data: textBox.value,
      username: 'test222',
      channel: 'iiiii',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    socket.send(JSON.stringify(msg))
  }

  socket.onmessage = function (event) {
    console.log(event.data)
    var text = ''
    var msg = JSON.parse(event.data)

    if (msg.type === 'message') {
      text = msg.username + ': ' + msg.data
    }

    if (text.length) {
      const now = new Date()
      const newMsg = document.createElement('div')
      newMsg.classList.add('message')
      const date = document.createElement('div')
      date.textContent = now
      date.classList.add('dateTime')
      const newP = document.createElement('p')
      newP.textContent = text
      newMsg.appendChild(date)
      newMsg.appendChild(newP)

      chatContainer.appendChild(newMsg)
    }
  }
}
