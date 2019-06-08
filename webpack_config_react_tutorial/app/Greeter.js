import React, { Component } from 'react'

class Greeter extends Component {
  
  componentDidMount = () => {
    if ('serviceWorker' in navigator) {
      console.log('there u are..')
      navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('res', res))
        .catch(err => console.log('err', err))
    }
  }

  render() {
    return (
      <div>
        Some stuff here..
      </div>
    );
  }
}

export default Greeter