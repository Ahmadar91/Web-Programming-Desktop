import React from 'react'
import Bar from './bar/bar'
import './home.css'

export default class Home extends React.Component {
  render () {
    return (
      <div className='home'>
        <Bar />
      </div>
    )
  }
}
