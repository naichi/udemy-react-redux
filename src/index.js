import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { composeWithDevTools } from 'redux-devtools-extension'
// MuiThemeProvider MaterialUI ってのがJqueryのBootStrapに該当する感じのあれらしい
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './index.css';
import reducer from './reducers';
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';

// このへんん何してるかよくわからん
const enhancer = process.env.NODE_ENV === 'development' ?
    composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, applyMiddleware(thunk))

// Routing 内でのexact はRoutingの条件を若干厳しくするような感じの文言っていうイメージ
// <MuiThemeProvider>で既存のcomponentをwrapするだけで使えるようになる
ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/events/new" component={EventsNew} />
                    <Route path="/events/:id" component={EventsShow} />
                    <Route exact path="/" component={EventsIndex} />
                    <Route exact path="/events" component={EventsIndex} />
                    
                </Switch>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>,
        document.getElementById('root')
    );
