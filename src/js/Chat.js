
export function chat (id) {
  const Window = document.querySelector('#windowContainer template')
  console.log(Window)
  const windowDiv = document.importNode(Window.content, true)
  console.log(windowDiv)
  // const chatContainer = document.querySelector('#ChatContainer')
  const templateDiv = document.querySelectorAll('#ChatContainer template')[0].content.firstElementChild

  const chatDiv = document.importNode(templateDiv, true)
  console.log(chatDiv)
  const desktop = document.querySelector('body')
  desktop.appendChild(windowDiv)

  const body = document.querySelector('.body')
  console.log(body)
  body.appendChild(chatDiv)

  // chatContainer.appendChild(chatDiv)
  const messages = document.querySelector('#messages')
  const textBox = document.querySelector('#textBox')
  const button = document.querySelector('#button')

  button.addEventListener('click', () => {
    sendText()
    textBox.value = ''
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
      const newMsg = document.createElement('li')
      newMsg.textContent = text
      messages.appendChild(newMsg)
    }
  }
}
