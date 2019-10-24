import React from 'react'
import './game.css'
export default class MemoryGame extends React.Component {
  render () {
    return (
      <div id='window'>
        <div class='header'>  Memory Game <button class='close'>x</button></div>
        <div class='body'> ToDo memoryGame <div> Lorem ipsum </div></div>
      </div>
    )
  }
}
