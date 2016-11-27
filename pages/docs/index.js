import React from 'react'
import Link from 'next/link'
import Layout from '../../components/t/layout'

export default () => (
  <Layout title='TACHYONS / Docs'>
    <Link href='/docs/typography/docs'>
      <a children='docs' />
    </Link>
  </Layout>
)
