import React, { Component } from 'react'

class App extends Component {
  
  componentDidMount = () => {
    if ('serviceWorker' in navigator) {
      console.log('there u are..')
      navigator.serviceWorker.register('./js/sw.js')
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

export default App