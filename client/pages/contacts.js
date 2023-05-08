import React from 'react'
import Layout from '../components/Layout'
import Contacts from '../components/UI/Contacts'
import Box from '@mui/material/Box'

const Contact = () => {
  return (
    <Layout title={'О нас'}>
      <Box m={'8rem auto'} maxWidth={'lg'}>
        <Contacts />
      </Box>
    </Layout>
  )
}
export default Contact