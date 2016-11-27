import React from 'react'

export default () => (
  <header className='w-100 pa3 ph5-ns bg-white'>
		<div className='db dt-ns mw9 center w-100'>
			<div className='db dtc-ns v-mid tl w-50'>
				<a href='/' className='dib f5 f4-ns fw6 mt0 mb1 link black-70' title='Home'>
					Tachyons
					<div className='dib pl1'>
						<small className='nowrap f6 mt2 mt3-ns pr2 black-70 fw2'>v4.6.0</small>
					</div>
				</a>
			</div>
			<nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns'>
				<a title='Documentation' href='/docs/'
						className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
					Docs
				</a>
				<a title='Components' href='/components/'
						className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
					Components
				</a>
				<a title='Gallery of sites built with Tachyons' href='/gallery/'
						className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'>
					Gallery
				</a>
				<a title='Tachyons on GitHub' href='http://github.com/tachyons-css/tachyons/'
						className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dn dib-l'>
					GitHub
				</a>
			</nav>
		</div>
	</header>
)
