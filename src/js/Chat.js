
import DesktopWindow from './desktopWindow.js'
export default class Chat {
  constructor () {
    const DtWindow = new DesktopWindow()
    console.log(DtWindow)
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    // this.closeWindowButton = DtWindow.getClose()
    console.log(this.closeWindowButton)
    DtWindow.window.classList.add('whiteBackGround')
    if (this.hasUserName()) {
      this.createChat(DtWindow.window)
      this.changeUserName(DtWindow.window)
    } else {
      this.addUserName(DtWindow.window)
    }
    // this.socket = null
    this.addEvents(DtWindow.window)
  }

  createChat (dt) {
    const messageTemplate = document.querySelector('#message-container template')
    console.log(messageTemplate)
    const messageDiv = document.importNode(messageTemplate.content, true)
    console.log(messageDiv)
    const templateDiv = document.querySelectorAll('#ChatContainer template')[0].content.firstElementChild

    const chatDiv = document.importNode(templateDiv, true)
    console.log(chatDiv.childNodes[3].firstElementChild)
    this.textBox = chatDiv.childNodes[3].firstElementChild
    // chatDiv.classList.add('whiteBackGround')
    dt.appendChild(chatDiv)
    // this.displayName = chatDiv.childNodes[3].lastElementChild

    this.chatContainer = chatDiv.childNodes[1]
    console.log(this.chatContainer)

    this.button = chatDiv.querySelector('#button')
    this.socket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
    console.log(this.chatContainer)
    this.displayUserName = chatDiv.querySelector('#displayName')
    console.log('span', this.displayUserName)
    this.userName = localStorage.getItem('username')
    if (this.hasUserName()) {
      this.displayUserName.textContent = ' ' + this.userName
    } else {
      this.displayUserName.style.display = 'none'
    }
    this.button.addEventListener('click', (e) => {
      e.preventDefault()

      this.sendText()
      this.textBox.value = ''
    })
    this.textBox.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.sendText()
        this.textBox.value = ''
      }
    })
    this.socket.onmessage = (event) => {
      console.log(event.data)
      var text = ''
      var msg = JSON.parse(event.data)
      if (msg.type === 'heartbeat') {
        return
      }
      if (msg.type === 'notification') {
        text = msg.username + ': ' + msg.data
      }

      if (msg.type === 'message') {
        text = msg.username + ': ' + msg.data
      }
      if (text.length) {
        const now = new Date()
        const time = ' ' + now.getHours() + ':' + now.getMinutes() + ' on ' + now.getUTCDate() + '.' + now.getMonth() + '.' + now.getFullYear()
        const newMsg = document.createElement('div')
        const ServerUserName = msg.username
        if (ServerUserName === this.userName) {
          newMsg.classList.add('yourMessage')
        } else {
          newMsg.classList.remove('yourMessage')
        }
        newMsg.classList.add('message')
        const date = document.createElement('div')
        date.textContent = time
        date.classList.add('dateTime')
        const newP = document.createElement('p')
        newP.textContent = text
        newMsg.appendChild(date)
        newMsg.appendChild(newP)

        this.chatContainer.appendChild(newMsg)
      }
    }
  }

  hasUserName () {
    this.userName = localStorage.getItem('username')
    return !(this.userName === null || this.userName === '')
  }

  changeUserName (dt) {
    console.log('dffffff')
    // const changeUserNameButton = document.createElement('button')
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    const icon = document.createElement('i')
    icon.setAttribute('class', 'material-icons md-light black')
    icon.textContent = 'settings'
    a.appendChild(icon)
    a.classList.add('UserNameButton')
    // changeUserNameButton.appendChild(icon)
    // changeUserNameButton.textContent = 'Change Username'
    // changeUserNameButton.className = 'UserNameButton'
    dt.firstElementChild.appendChild(a)
    icon.addEventListener('click', () => {
      //  icon.preventDefault()
      icon.remove()
      a.remove()
      const textBox = document.createElement('input')
      textBox.placeholder = 'Enter UserName'
      textBox.required = true
      dt.appendChild(textBox)
      const userNameSubmit = document.createElement('button')
      userNameSubmit.setAttribute('id', 'buttonUserName')
      userNameSubmit.className = 'waves-effect waves-light btn'
      userNameSubmit.textContent = 'Submit'
      dt.appendChild(userNameSubmit)
      userNameSubmit.addEventListener('click', () => {
        this.userNameValue = textBox.value
        localStorage.setItem('username', this.userNameValue)
        this.displayUserName.textContent = ' ' + this.userNameValue
        textBox.remove()
        userNameSubmit.remove()
        this.changeUserName(dt)
      })
    })
  }

  addUserName (dt) {
    const textBox = document.createElement('input')
    textBox.required = true
    textBox.placeholder = 'Enter UserName'
    dt.appendChild(textBox)
    const submit = document.createElement('button')
    submit.classList.add('button')
    submit.textContent = 'submit'
    dt.appendChild(submit)
    submit.addEventListener('click', () => {
      this.createChat(dt)
      this.userNameValue = textBox.value
      console.log(this.userNameValue)
      localStorage.setItem('username', this.userNameValue)
      this.displayUserName.style.display = 'block'
      this.displayUserName.textContent = this.userNameValue
      textBox.remove()
      submit.remove()
      this.changeUserName(dt)
    })
  }

  sendText () {
    if (this.textBox.value === '') {
      return
    }
    this.userName = localStorage.getItem('username')
    console.log(this.textBox.value)
    const msg = {
      type: 'message',
      data: this.textBox.value,
      username: this.userName,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.socket.send(JSON.stringify(msg))
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
      if (this.socket !== null) {
        this.socket.close()
      }
    })
  }
}
