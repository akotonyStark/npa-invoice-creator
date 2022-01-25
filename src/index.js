import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'

import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'
import Login from '../src/views/examples/Login.js'

import { createStore } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'
import Maps from 'views/examples/Maps.js'

/* Things I will need for redux

1. STORE --> Globalized State
2. ACTION --> Describes whaat you wanna do
3. REDUCER -->  Modifies store based on action
4. DISPATCH -->  Sends action to reducer

*/

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/auth/login' render={(props) => <Login {...props} />} />
        <Route
          path='/admin/index'
          exact
          render={(props) => <AdminLayout {...props} />}
        />
        <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
        <Redirect from='/' to='/auth/login' />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
