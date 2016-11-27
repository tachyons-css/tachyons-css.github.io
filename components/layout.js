import React from 'react'

import Head from './head'
import Header from './header'

export default ({ children }) => (
  <div>
    <Head />
    <Header />
    {children}
  </div>
)
