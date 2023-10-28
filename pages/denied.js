import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const denied = () => {
  return (
    <div>
    <Header />
    <main>
      <div className='flex h-screen justify-center items-center'>
            Denied
      </div>
  </main>
  <Footer />
</div>
  )
}

export default denied
