import React from 'react'
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({title, description, children, robots}) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='robots' content={robots ? robots : 'all'} />
        <title>{title}</title>
      </Head>
      <Navbar /> 
      <>
        {children}
      </>
      <footer>
        {/* <Footer />  */}
        <Footer />
      </footer>
    </>
  )
}

export default Layout