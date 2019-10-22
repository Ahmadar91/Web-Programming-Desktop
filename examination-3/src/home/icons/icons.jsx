import React from 'react'
import './icons.css'

export default class Icons extends React.Component {
  render () {
    return (
      <div>
        <button> {this.props.name}
        </button>
      </div>

    )
  }
}
