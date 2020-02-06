import React, { Component } from 'react';
import { connct } from 'react-redux';

import { increment, decrement } from '../actions';

class Counter extends Component{
  render() {
    const props = this.props
    return (
    <React.Fragment>
      <div>value: { props.value }</div>
        <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
    </React.Fragment >
      )
    }
}
  
const mapStateToProps = state => ({ value: state.count.value })
const mapDispatchToProps = dispatch => ({
  increment: () => (increment()),
  decrement: () => (decrement())
})

// const mapDispatchToProps = ({ increment, decrement })
  
export default connct(mapStateToProps, mapDispatchToProps)(App)
