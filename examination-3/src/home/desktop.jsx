import React from 'react'

export default class Desktop extends React.Component {
  render () {
    return (
      <div className='desktop'>
        {this.props.arr.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    )
  }
}
