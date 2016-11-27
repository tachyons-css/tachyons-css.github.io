import React from 'react'
import Link from 'next/link'

import Layout from '../components/t/layout'
import {
  Nav,
	StyleGuide,
  Testimonials
} from '../components/t/home'

export default () => (
  <Layout title='TACHYONS - Css Toolkit'>
    <Nav />
		<StyleGuide />
    <Testimonials />
  </Layout>
)
