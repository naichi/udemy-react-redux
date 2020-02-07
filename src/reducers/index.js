import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import events from './events'

// ここでformを'redux-form'からimportしていないと、formが機能しないので文字入力などができないっぽい
export default combineReducers({ events, form })