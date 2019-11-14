
import DesktopWindow from './desktopWindow.js'
/**
 *
 *
 * @export
 * @class Chat
 */
export default class Chat {
  /**
   *Creates an instance of Chat.
   * @memberof Chat
   */
  constructor () {
    const DtWindow = new DesktopWindow()
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    DtWindow.window.classList.add('whiteBackGround')
    if (this.hasUserName()) {
      this.createChat(DtWindow.window)
      this.changeUserName(DtWindow.window)
    } else {
      this.addUserName(DtWindow.window)
    }
    this.addEvents(DtWindow.window)
  }

  /**
   *
   *
   * @param {*} dt
   * @memberof Chat
   */
  createChat (dt) {
    const templateDiv = document.querySelectorAll('#ChatContainer template')[0].content.firstElementChild
    const chatDiv = document.importNode(templateDiv, true)
    this.textBox = chatDiv.childNodes[3].firstElementChild
    dt.appendChild(chatDiv)
    this.chatContainer = chatDiv.childNodes[1]
    this.button = chatDiv.querySelector('#button')
    this.socket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.displayUserName = chatDiv.querySelector('#displayName')
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
      this.textBox.placeholder = 'Your message'
    })

    this.textBox.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.sendText()
        this.textBox.value = ''
        this.textBox.placeholder = 'Your message'
      }
    })

    this.socket.onmessage = (event) => {
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

  /**
   *
   *
   * @returns
   * @memberof Chat
   */
  hasUserName () {
    this.userName = localStorage.getItem('username')
    return !(this.userName === null || this.userName === '')
  }

  /**
   *
   *
   * @param {*} dt
   * @memberof Chat
   */
  changeUserName (dt) {
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
      const textBox = document.createElement('input')
      textBox.placeholder = 'Enter UserName'
      textBox.required = true
      dt.appendChild(textBox)
      const userNameSubmit = document.createElement('button')
      userNameSubmit.setAttribute('id', 'buttonUserName')
      userNameSubmit.className = 'waves-effect waves-light btn'
      userNameSubmit.textContent = 'Submit'
      dt.appendChild(userNameSubmit)
      textBox.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
          this.userNameValue = textBox.value
          localStorage.setItem('username', this.userNameValue)
          this.displayUserName.textContent = ' ' + this.userNameValue
          textBox.remove()
          userNameSubmit.remove()
          this.changeUserName(dt)
        }
      })

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

  /**
   *
   *
   * @param {*} dt
   * @memberof Chat
   */
  addUserName (dt) {
    const textBox = document.createElement('input')
    textBox.required = true
    textBox.placeholder = 'Enter UserName'
    dt.appendChild(textBox)
    const submit = document.createElement('button')
    submit.className = 'waves-effect waves-light btn'
    submit.setAttribute('id', 'addUserButton')
    submit.textContent = 'submit'
    dt.appendChild(submit)
    textBox.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.createChat(dt)
        this.userNameValue = textBox.value
        localStorage.setItem('username', this.userNameValue)
        this.displayUserName.style.display = 'block'
        this.displayUserName.textContent = this.userNameValue
        textBox.remove()
        submit.remove()
        this.changeUserName(dt)
      }
    })
    submit.addEventListener('click', () => {
      this.createChat(dt)
      this.userNameValue = textBox.value
      localStorage.setItem('username', this.userNameValue)
      this.displayUserName.style.display = 'block'
      this.displayUserName.textContent = this.userNameValue
      textBox.remove()
      submit.remove()
      this.changeUserName(dt)
    })
  }

  /**
   *
   *
   * @memberof Chat
   */
  sendText () {
    if (this.textBox.value === '') {
      return
    }
    this.userName = localStorage.getItem('username')
    const msg = {
      type: 'message',
      data: this.textBox.value,
      username: this.userName,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.socket.send(JSON.stringify(msg))
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Chat
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
   * @memberof Chat
   */
  moveDragOver () {
    this.isClicked = false
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Chat
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
   * @memberof Chat
   */
  addEvents (DtWindow) {
    DtWindow.addEventListener('mousedown', this.moveStart, true)
    DtWindow.addEventListener('mouseup', this.moveDragOver, true)
    DtWindow.addEventListener('mousemove', this.moveDrop, true)
    this.closeWindowButton.addEventListener('click', () => {
      DtWindow.remove()
      if (this.socket !== undefined) {
        this.socket.close()
      }
    })
  }
}
