import React from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import withData from './withData'
import Layout from './Layout'
import Home from './Home'
import Docs from './Docs'

const App = props =>
  <Router>
    <Layout {...props}>
      <Route exact path='/' component={withData(Home)} />
      <Route path='/docs' component={Docs} />
    </Layout>
  </Router>

export default App
