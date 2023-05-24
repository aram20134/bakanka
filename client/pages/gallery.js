import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Box, Card, Grid, Typography } from '@mui/material'
import { getImages } from '../api/ordersAPI';

import GalleryImages from '../components/GalleryImages';

export const Gallery = ({images}) => {
  
  return (
    <Layout title={'Галерея'} description={'Галерея баканское озеро'}>
      <Box m={'8rem auto'} maxWidth={'lg'}>
        <Typography mb={2} textAlign={'center'} variant='h2' color={'info.main'}>Галерея</Typography>
        <Grid container>
          <Grid item>
            <Card sx={{p:2}}>
              <GalleryImages images={images} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Gallery

export async function getStaticProps() {
  const images = await getImages()
  return {
    props: {
      images
    },
    revalidate: 10
  };
}