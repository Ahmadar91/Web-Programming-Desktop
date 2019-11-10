
import DesktopWindow from './desktopWindow.js'
export default class player {
  constructor () {
    const DtWindow = new DesktopWindow()
    console.log(DtWindow)
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    // this.closeWindowButton = DtWindow.getClose()
    console.log(this.closeWindowButton)
    const song = new Audio()
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

    const songs = ['../audio/Above&Beyond.mp3', '../audio/Time.mp3', '../audio/PinkFloyd.mp3']
    const poster = ['../image/Poster1.jpg', '../image/Poster2.jpg', '../image/Poster3.jpg']

    const songTitle = PlayerDiv.querySelector('#songTitle')
    const fillBar = PlayerDiv.querySelector('#fill')
    const timeBar = PlayerDiv.querySelector('#time')
    const volumeBar = PlayerDiv.querySelector('#volume')
    const muteButton = PlayerDiv.querySelector('#mute')

    // var song = new Audio()
    let currentSong = 0 // it point to the current song

    // window.onload = playSong // it will call the function playSong when window is load

    function playSong () {
      song.src = songs[currentSong] // set the source of 0th song
      const text = songs[currentSong]
      songTitle.textContent = text.slice(9, text.length - 4) // set the title of song
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
    function TimeFormat (time) {
      // Hours, minutes and seconds
      const hrs = ~~(time / 3600)
      const mins = ~~((time % 3600) / 60)
      const secs = ~~time % 60

      // Output like "1:01" or "4:03:59" or "123:03:59"
      let ret = ''

      if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
      }

      ret += '' + mins + ':' + (secs < 10 ? '0' : '')
      ret += '' + secs
      return ret
    }

    song.addEventListener('timeupdate', function () {
      timeBar.textContent = 'song Duration: ' + TimeFormat(song.duration) + ' minutes' + ' currentTime: ' + TimeFormat(song.currentTime)
      console.log(song.currentTime)

      const position = song.currentTime / song.duration
      fillBar.style.width = position * 100 + '%'
    })

    volumeBar.addEventListener('change', function (e) {
      const volume = e.target.value / 100
      console.log(volume)

      song.volume = parseFloat(volume)
      console.log(parseFloat(volume))
    })
    muteButton.addEventListener('click', function () {
      if (song.muted) {
        song.muted = false
        muteButton.textContent = 'volume_up'
      } else {
        song.muted = true
        muteButton.textContent = 'volume_off'
      }
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
