import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

class EventsIndex extends Component{
  componentDidMount(){
    console.log("hi")
    this.props.readEvents()
  }

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
const mapDispatchToProps = dispatch => ({ readEvents })

// const mapDispatchToProps = ({ increment, decrement })
  
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
