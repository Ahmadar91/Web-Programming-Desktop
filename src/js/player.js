
import DesktopWindow from './desktopWindow.js'
export default class player {
  constructor () {
    const DtWindow = new DesktopWindow()
    console.log(DtWindow)
    this.closeWindowButton = DtWindow.window.childNodes[1].childNodes[1]
    // this.closeWindowButton = DtWindow.getClose()
    console.log(this.closeWindowButton)
  }
}
