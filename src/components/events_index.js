import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { readEvents } from '../actions';

class EventsIndex extends Component{
  componentDidMount(){
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id }>
        <th>{event.id}</th>
        <th>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </th>
        <th>{event.body}</th>
      </tr>
    ))
  }

  render() {
    //const props = this.props

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>

          <tbody>
            {this.renderEvents()}
          </tbody>

        </table>

        <Link to="/events/new">New Events</Link>
      </React.Fragment>

      )
    }
}
  
const mapStateToProps = state => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

// const mapDispatchToProps = ({ increment, decrement })
  
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
