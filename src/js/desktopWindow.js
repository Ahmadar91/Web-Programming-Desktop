/**
 *
 *
 * @export
 * @class DesktopWindow
 */
export default class DesktopWindow {
  /**
   *Creates an instance of DesktopWindow.
   * @memberof DesktopWindow
   */
  constructor () {
    this.windowContainer = document.querySelector('.windowContainer')
    this.windowDiv = document.querySelectorAll('.windowContainer template')[0].content.firstElementChild
    this.window = document.importNode(this.windowDiv, true)
    this.windowContainer.appendChild(this.window)
  }

  /**
   *
   * gets the close button for the window header
   * @returns
   * @memberof DesktopWindow
   */
  getClose () {
    return this.closeWindowButton
  }

  /**
   * gets the window
   * @returns
   * @memberof DesktopWindow
   */
  getWindow () {
    return this.window
  }
}
