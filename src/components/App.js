import React, { Component } from 'react';

const App = () => (<Counter></Counter>)

class Counter extends Component{
  constructor(props) {
    super(props)
    console.log(this.state)
    this.state = { count: 0 }
  }

  handlePlusButoon = () => {
      this.setState({ count: this.state.count + 1})
  }

  handleMinusButoon = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    return (
    <React.Fragment>
      <div>count: {this.state.count}</div>
        <button onClick={this.handlePlusButoon}>+1</button>
        <button onClick={this.handleMinusButoon}>-1</button>
    </React.Fragment >
      )
    }
  }
  
  export default App;
