import React from 'react'
import Layout from '../components/Layout'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import WarningIcon from '@mui/icons-material/Warning';

export const e404 = () => {
  return (
    <Layout title={'Не найдено'}>
      <Container sx={{mt:20, textAlign:'center'}} disableGutters>
        <WarningIcon sx={{fontSize:50}} color='warning' />
        <Typography color={'info.dark'} variant='h2'>404</Typography>
        <Typography variant='subtitle'>Такой страницы не найдено</Typography>
        <Button sx={{mt:2}} fullWidth variant='contained' component={Link} href='.'>
          На главную
        </Button>
      </Container>
    </Layout>
  )
}

export default e404
