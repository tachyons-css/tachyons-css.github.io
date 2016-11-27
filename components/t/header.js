import React from 'react'
import Link from 'next/link'

export default () => (
  <header className='w-100 pa3 ph5-ns bg-white bb b--black-10'>
		<div className='db dt-ns mw9 center w-100'>
			<div className='db dtc-ns v-mid tl w-50'>
				<Link href='/'>
          <a href='/' className='dib f5 f4-ns fw6 mt0 mb1 link black-70' title='Home'>
            Tachyons
            <div className='dib pl1'>
              <small className='nowrap f6 mt2 mt3-ns pr2 black-70 fw2'>v4.6.0</small>
            </div>
          </a>
        </Link>
			</div>

			<nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns'>
				<HeaderLink
          title='Documentation'
          href='/docs'
          children='Docs'
        />
				<HeaderLink
          title='Components'
          href='/components'
          children='Components'
        />
				<HeaderLink
          title='Gallery of sites built with Tachyons'
          href='/gallery'
          children='Gallery'
        />
				<HeaderLink
          title='Tachyons on GitHub'
          href='http://github.com/tachyons-css/tachyons/'
          children='GitHub'
        />
			</nav>
		</div>
	</header>
)

const HeaderLink = ({ href, title, children }) => (
  <Link href={href}>
    <a
      title='Tachyons on GitHub'
      className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dn dib-l'
      children={children}
    />
  </Link>
)
