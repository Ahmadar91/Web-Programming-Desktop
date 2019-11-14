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
   *
   * @returns
   * @memberof DesktopWindow
   */
  getClose () {
    return this.closeWindowButton
  }

  /**
   *
   *
   * @returns
   * @memberof DesktopWindow
   */
  getWindow () {
    return this.window
  }
}
