import React from 'react'

import Nav from './NavHome'
import Hero from './Hero'
import GettingStarted from './GettingStarted'

export default ({
  version
}) =>
  <main className='w-100 bt b--black-10 bg-white'>
    <section className='bg-black-0125 w-100'>
      <article>
        <Nav />
        <Hero version={version} />
        <GettingStarted version={version} />
      </article>
    </section>
  </main>
