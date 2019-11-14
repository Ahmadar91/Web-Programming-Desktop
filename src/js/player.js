
import DesktopWindow from './desktopWindow.js'
/**
 * Player class
 *
 * @export
 * @class Player
 */
export default class Player {
  /**
   *Creates an instance of Player.
   * @memberof Player
   */
  constructor () {
    const DtWindow = new DesktopWindow()
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    const song = new Audio()
    this.createPlayer(DtWindow.window, song)
    this.addEvents(DtWindow.window, song)
  }

  /**
   *
   *create a player and append the player to window
   * @param {*} dt
   * @param {*} song
   * @memberof Player
   */
  createPlayer (dt, song) {
    const templateDiv = document.querySelectorAll('.PlayerContainer template')[0].content.firstElementChild
    let counter = 0
    const PlayerDiv = document.importNode(templateDiv, true)
    dt.appendChild(PlayerDiv)
    const songs = ['../audio/song1.mp3', '../audio/song2.mp3', '../audio/song3.mp3']
    const poster = ['../image/Poster1.jpg', '../image/Poster2.jpg', '../image/Poster3.jpg']
    const songTitle = PlayerDiv.querySelector('#songTitle')
    const fillBar = PlayerDiv.querySelector('#fill')
    const timeBar = PlayerDiv.querySelector('#time')
    const volumeBar = PlayerDiv.querySelector('#volume')
    const muteButton = PlayerDiv.querySelector('#mute')
    let currentSong = 0

    /**
     * play song from local files using and array to store them and to navigate them
     */
    function playSong () {
      song.src = songs[currentSong]
      const text = songs[currentSong]
      songTitle.textContent = text.slice(9, text.length - 4)
      const playPromise = song.play()
      if (playPromise !== null) {
        playPromise.catch(() => { song.play() })
      }
    }

    /**
     * if the audio object is paused play and vice versa and change the img attribute
     */
    function playOrPauseSong () {
      if (song.paused) {
        song.play()
        PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
      } else {
        song.pause()
        PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Play.png')
      }
    }
    /**
     * return a string of the song time in the format xx:xx
     * @param {*} time
     */
    function TimeFormat (time) {
      const hrs = ~~(time / 3600)
      const mins = ~~((time % 3600) / 60)
      const secs = ~~time % 60

      let ret = ''

      if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
      }

      ret += '' + mins + ':' + (secs < 10 ? '0' : '')
      ret += '' + secs
      return ret
    }

    song.addEventListener('timeupdate', function () {
      timeBar.textContent = ' ' + TimeFormat(song.currentTime) + '/' + TimeFormat(song.duration)

      const position = song.currentTime / song.duration
      fillBar.style.width = position * 100 + '%'
    })

    volumeBar.addEventListener('change', function (e) {
      const volume = e.target.value / 100

      song.volume = parseFloat(volume)
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

    const seekBar = PlayerDiv.querySelector('#seek-bar')

    seekBar.addEventListener('mousedown', function (e) {
      const clickPosition = e.clientX - e.target.offsetParent.offsetLeft - seekBar.offsetLeft

      song.currentTime = (clickPosition / seekBar.offsetWidth) * song.duration
    }, false)

    /**
     * go to the next song and play it
     */
    function next () {
      currentSong++
      if (currentSong > 2) {
        currentSong = 0
      }
      playSong()
      PlayerDiv.querySelector('#play img').setAttribute('src', '../image/Pause.png')
      PlayerDiv.querySelector('#image img').setAttribute('src', poster[currentSong])
    }
    /**
     * go to the previous song and play it
     */
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

  /**
   *
   *
   * @param {*} e
   * @memberof Player
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
   * @memberof Player
   */
  moveDragOver () {
    this.isClicked = false
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Player
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
   * @param {*} song
   * @memberof Player
   */
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
