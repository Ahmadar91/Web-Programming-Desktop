import DesktopWindow from './desktopWindow.js'
export default class Chat {
  constructor () {
    const myWindow = new DesktopWindow()
    const messageTemplate = document.querySelector('#message-container template')
    console.log(messageTemplate)
    const messageDiv = document.importNode(messageTemplate.content, true)
    console.log(messageDiv)
    const templateDiv = document.querySelectorAll('#ChatContainer template')[0].content.firstElementChild

    const chatDiv = document.importNode(templateDiv, true)
    console.log(chatDiv.childNodes[3].firstElementChild)
    this.textBox = chatDiv.childNodes[3].firstElementChild
    myWindow.window.appendChild(chatDiv)

    this.chatContainer = chatDiv.childNodes[1]
    console.log(this.chatContainer)

    this.button = chatDiv.querySelector('#button')
    this.socket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
    console.log(this.chatContainer)

    this.socket.onmessage = (event) => {
      console.log(event.data)
      console.log(this.chatContainer)
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

        this.chatContainer.appendChild(newMsg)
      }
    }
  }

  chat (id) {
    this.button.addEventListener('click', () => {
      this.sendText()
      this.textBox.value = ''
    })
  }

  sendText () {
    if (this.textBox.value === '') {
      return
    }
    console.log(this.textBox.value)
    const msg = {
      type: 'message',
      data: this.textBox.value,
      username: 'test222',
      channel: 'iiiii',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.socket.send(JSON.stringify(msg))
  }
}
