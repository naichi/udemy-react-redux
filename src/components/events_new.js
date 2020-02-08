import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'

// material-uiのimport
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { postEvent } from '../actions';

class EventsNew extends Component{
  // ここのconstructorでonSubmitをbindすることで、下のonSubmitが機能するようになる
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    // TextFieldの導入でここまで買いてた内容を完結にまとめることができるようになった感じのイメージ
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

  async onSubmit(values) {
    await this.props.postEvent(values)
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
const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)

)
