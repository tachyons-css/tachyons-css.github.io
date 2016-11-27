import React from 'react'

import Head from './head'
import Header from './header'

export default ({ title, children }) => (
  <div>
    <Head title={title} />
    <Header />
    {children}
  </div>
)
