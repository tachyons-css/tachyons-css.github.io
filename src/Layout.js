import React from 'react'

import Header from './Header'
import Footer from './Footer'

export default ({
  title = 'Tachyons - Css Toolkit',
  version,
  children
}) =>
  <div className='w-100 sans-serif'>
    <title>{title}</title>
    <link
      rel='stylesheet'
      href={`https://unpkg.com/tachyons/css/tachyons.min.css`}
    />

    <Header version={version} />
    <div>{children}</div>
    <Footer />
  </div>
