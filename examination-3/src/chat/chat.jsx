import React from 'react'
import './chat.css'

export default class Chat extends React.Component {
  render () {
    return (
      <div className='container'>
        <header className='header'>
                 Chat app
          <button className='close'> close</button>
        </header>
        <div> <ul /></div>
        <div><form><input type='Text' className='input' /> <button className='submit'>submit</button></form> </div>
      </div>

    )
  }
}
