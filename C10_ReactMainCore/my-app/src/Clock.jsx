import React from 'react'

const lists = ['bmw', 'toyota', 'honda']

const fetchApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lists)
    }, 1000)
  })
}

export default class Clock extends React.Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      time: {
        created: new Date().toLocaleTimeString()
      },
      seconds: {
        created: new Date().getSeconds()
      },
      name: this.props.name,
      lists: []
    }
    this.date = '22/12/2012'
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetchApi().then((res) => this.setState((prev) => ({ ...prev, lists: res })))
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  getTime = () => {
    const newState = {
      ...this.state,
      seconds: {
        created: new Date().getSeconds()
      }
    }
    this.setState(newState)
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2 id='seconds'>It is {this.state.time.created}</h2>
        <h4>My name is {this.state.name}</h4>
        <h3>It is {this.state.seconds.created}</h3>
        <h5>{this.state.lists}</h5>
        <button onClick={this.getTime}>Get current time</button>
      </div>
    )
  }
}
