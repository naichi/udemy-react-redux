import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'

// material-uiのimport
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component{
  // ここのconstructorでonSubmitをbindすることで、下のonSubmitが機能するようになる
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')

  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  render() {
    // pristine というので触っていない状態を定義できる
    // submitting で複数クリックによる誤送信情報を防げる
    // invalid で一定条件下以外でのSubmitの禁止などを付与(validation error)
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label='Title' name='title' type="text" component={this.renderField} /></div>
        <div><Field label='Body' name='body' type="text" component={this.renderField} /></div>

        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
        <RaisedButton label="Delete" style={style} onClick={this.onDeleteClick} /> 
      </form>
      )
    }
}

const validate = values => {
  const errors = {}
  
  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, state }
}

// componentにactionの関数をbindする
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

// enableReinitializeがfalseだったら、他ユーザーが利用している場合の情報更新の際に齟齬が生じる可能性がある
// true の場合は他ページに遷移する場合に元あった情報(メモリ)を参照することがなくなるため、この辺の齟齬の危険性がなくなる
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)
