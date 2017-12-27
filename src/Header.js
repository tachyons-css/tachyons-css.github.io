import React from 'react'
import { Link } from 'react-router-dom'

export default ({ version }) =>
  <header className='w-100 pa3 ph5-ns bg-white'>
    <div className='db dt-ns mw9 center w-100'>
      <div className='db dtc-ns v-mid tl w-50'>
        <Link to='/' className='dib f5 f4-ns fw6 mt0 mb1 link black-70' title='Home'>
          Tachyons
          <div className='dib pl1'>
            <small className='nowrap f6 mt2 mt3-ns pr2 black-70 fw2'>v{version}</small>
          </div>
        </Link>
      </div>
      <nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns'>
        <Link title='Documentation' to='/docs/' className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
          Docs
        </Link>
        <Link title='Components' to='/components/' className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
          Components
        </Link>
        <Link title='Gallery of sites built with Tachyons' to='/gallery/' className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
          Gallery
        </Link>
        <Link title='Resources' to='/resources/' className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
          Resources
        </Link>
        <Link title='Tachyons on GitHub' to='http://github.com/tachyons-css/tachyons/' className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dn dib-l'>
          GitHub
        </Link>
      </nav>
    </div>
  </header>
