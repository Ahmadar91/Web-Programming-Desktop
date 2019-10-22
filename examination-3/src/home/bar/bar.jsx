import React from 'react'
import Icons from '../icons/icons'
import './bar.css'

export default class Bar extends React.Component {
  render () {
    return (
      <div className='bar'>
        <Icons name='Chat' />
        <Icons name='Memory Game' />
        <Icons name='Anything' />
      </div>
    )
  }
}
