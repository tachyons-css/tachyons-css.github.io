import React from 'react'
import Link from 'next/link'

export default () => (
	<header className='ph3 ph5-ns w-100 bg-transparent pv3 mb4 mb5-ns bb b--black-10 overflow-auto'>
		<div className='nowrap mw9 center'>
			<NavLink
				title='Getting Started'
				href='#getting-started'
				children='Getting Started'
			/>
			<NavLink
				title='Principles'
				href='#priniciples'
				children='Principles'
			/>
			<NavLink
				title='Features'
				href='#features'
				children='Features'
			/>
			<NavLink
				title='Style Guide'
				href='#style'
				children='Style Guide'
			/>
			<NavLink
				title='Testimonials'
				href='#testimonials'
				children='Testimonials'
			/>
		</div>
	</header>
)

const NavLink = ({ href, title, children }) => (
  <Link href={href}>
    <a
      title='Tachyons on GitHub'
      className='pv1-ns f6 fw6 dim link black-70 mr2 mr3-m mr4-l dib'
      children={children}
    />
  </Link>
)
