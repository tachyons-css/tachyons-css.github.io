import React from 'react'

import {
  BrowserRouter,
  StaticRouter,
  Route
} from 'react-router-dom'

const Router = typeof document === 'undefined' ? StaticRouter : BrowserRouter

import withData from './withData'
import Layout from './Layout'
import Home from './Home'
import Docs from './Docs'

const App = props =>
  <Router location={props.pathname}>
    <Layout {...props}>
      <Route exact path='/' component={withData(Home)} />
      <Route path='/docs' component={withData(Docs)} />
    </Layout>
  </Router>

export default withData(App)
