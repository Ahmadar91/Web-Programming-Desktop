
import DesktopWindow from './desktopWindow.js'
export default class player {
  constructor () {
    const DtWindow = new DesktopWindow()
    console.log(DtWindow)
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    // this.closeWindowButton = DtWindow.getClose()
    console.log(this.closeWindowButton)
    var song = new Audio()
    this.createPlayer(DtWindow.window, song)
    this.addEvents(DtWindow.window, song)
  }

  createPlayer (dt, song) {
    const templateDiv = document.querySelectorAll('.PlayerContainer template')[0].content.firstElementChild
    console.log(templateDiv)
    let counter = 0
    const PlayerDiv = document.importNode(templateDiv, true)
    console.log(PlayerDiv)

    dt.appendChild(PlayerDiv)

    const songs = ['Above&Beyond.mp3', 'Time.mp3', 'PinkFloyd.mp3']
    const poster = ['../image/Poster1.jpg', '../image/Poster2.jpg', '../image/Poster3.jpg']

    const songTitle = PlayerDiv.querySelector('#songTitle')
    const fillBar = PlayerDiv.querySelector('#fill')
    const timeBar = PlayerDiv.querySelector('#time')
    // var song = new Audio()
    let currentSong = 0 // it point to the current song

    // window.onload = playSong // it will call the function playSong when window is load

    function playSong () {
      song.src = songs[currentSong] // set the source of 0th song
      songTitle.textContent = songs[currentSong] // set the title of song
      // song.play() // play the song
      const playPromise = song.play()
      if (playPromise !== null) {
        playPromise.catch(() => { song.play() })
      }
    }

    function playOrPauseSong () {
      if (song.paused) {
        song.play()
        PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
      } else {
        song.pause()
        PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Play.png')
      }
    }

    song.addEventListener('timeupdate', function () {
      timeBar.textContent = 'song Duration: ' + Math.round(song.duration / 60) + ' minutes' + ' currentTime: ' + Math.round(song.currentTime)
      const position = song.currentTime / song.duration
      fillBar.style.width = position * 100 + '%'
    })

    function next () {
      currentSong++
      if (currentSong > 2) {
        currentSong = 0
      }
      playSong()
      PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
      PlayerDiv.querySelector('#image img').setAttribute('src', poster[currentSong])
    }

    function pre () {
      currentSong--
      if (currentSong < 0) {
        currentSong = 2
      }
      playSong()
      PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
      PlayerDiv.querySelector('#image img').setAttribute('src', poster[currentSong])
    }

    const preButton = PlayerDiv.querySelector('#pre')
    const playButton = PlayerDiv.querySelector('#play')
    const nextButton = PlayerDiv.querySelector('#next')
    preButton.addEventListener('click', () => {
      pre()
    })
    playButton.addEventListener('click', () => {
      if (counter === 0) {
        playSong()
        PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
        PlayerDiv.querySelector('#image img').setAttribute('src', poster[currentSong])
        counter++
      } else { playOrPauseSong() }
    })
    nextButton.addEventListener('click', () => {
      next()
    })
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

  addEvents (DtWindow, song) {
    DtWindow.addEventListener('mousedown', this.moveStart, true)
    DtWindow.addEventListener('mouseup', this.moveDragOver, true)
    DtWindow.addEventListener('mousemove', this.moveDrop, true)
    this.closeWindowButton.addEventListener('click', () => {
      song.pause()
      DtWindow.remove()
    })
  }
}
