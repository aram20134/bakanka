import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


import bgImage from '../assets/bgTESTONLY.jpg'
// import inst from '../assets/inst.svg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import Layout from '../components/Layout'
import CounterCard from '../components/UI/CounterCard'
import Image from 'next/image'
import Information from '../components/UI/Information'

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PhoneInput from 'react-phone-input-2'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import Contacts from '../components/UI/Contacts'
import OrderPhone from '../components/UI/OrderPhone'


export default function Home() {


  return (
    <Layout title={'Баканское озеро'} description={'База отдыха баканское озеро'}>
      
      <Box width={'100%'} minHeight={'75vh'} sx={{backgroundImage: `url(${bgImage.src})`, backgroundSize: 'cover', backgroundPosition:'center', display:'grid', placeItems:'center'}}>
        <Container>
          <Grid maxWidth={'sm'} container direction={'column'} justifyContent={'center'} mx={'auto'} alignItems={'center'}>
            <Typography sx={{textShadow:'0px 0px 10px black'}} textAlign={'center'} color={'white'} variant='h1'>Баканское озеро</Typography>
            <Typography sx={{textShadow:'0px 0px 20px black'}} textAlign={'center'} color={'white'} variant='body1'>Наши великолепные удобства и окружающая природа позволят вам полностью расслабиться и насладиться отдыхом вдали от шума и суеты города. Забудьте о повседневных заботах и наслаждайтесь природными красотами на нашей уютной базе отдыха.</Typography>
          </Grid>
        </Container>
      </Box>
      <Card sx={{p:5, mt: -8, backgroundColor:'rgba(255, 255, 255, 0.7)', backdropFilter: 'saturate(200%) blur(30px)', mx: {xs: 2, lg: 3}, flexDirection:'row', display:'flex'}}>
        <Grid container item xs={12} lg={9} sx={{mx:'auto'}}>
          <Grid item xs={12} md={4}>
            <CounterCard suffix="+" count={4} title={'Лет работы'} description={'Гарантия безупречного сервиса, уютного проживания и незабываемых впечатлений в нашей базе отдыха'} />
          </Grid>
          <Grid item xs={12} md={4} display={'flex'}>
            <Divider orientation='vertical' sx={{display: {xs: 'none', md: 'block'}, mx: 0}} />
            <CounterCard suffix="+" count={3} title={'Гектаров земли'} description={'Погрузитесь в окружающую природу и насладиться разнообразными активностями'} />
          </Grid>
          <Grid item xs={12} md={4} display={'flex'}>
            <Divider orientation='vertical' sx={{display: {xs: 'none', md: 'block'}, mx: 0}} />
            <CounterCard suffix="+" count={5} title={'Беседок'} description={'Выберите удобное место для отдыха с друзьями и семьей в живописной природной среде'} />
          </Grid>
        </Grid>
      </Card>
      {/* <Card sx={{p:5, mt: 2, backgroundColor:'rgba(255, 255, 255, 0.7)', backdropFilter: 'saturate(200%) blur(30px)', mx: {xs: 2, lg: 3}, flexDirection:'row', display:'flex'}}>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation
          centeredSlides={true}
          slidesPerView={1}
          modules={[Autoplay, Navigation, Pagination]}
          pagination={{ clickable: true }}
        >
          <SwiperSlide style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image alt='' src={bgImage} style={{height:'350px', objectFit:'cover', width:'100%'}}  />
          </SwiperSlide>
          <SwiperSlide style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image alt='' src={bgImage} style={{height:'350px', objectFit:'cover', width:'100%'}} />
          </SwiperSlide>
          <SwiperSlide style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image alt='' src={bgImage} style={{height:'350px', objectFit:'cover', width:'100%'}} />
          </SwiperSlide>
        </Swiper>
      </Card> */}
      <Card sx={{p:0, mt: 2, backgroundColor:'rgba(255, 255, 255, 0.7)', backdropFilter: 'saturate(200%) blur(30px)', mx: {xs: 2, lg: 3}, flexDirection:'row'}}>
        <Information />
      </Card>
      <Card sx={{p:2, mt: 2, backgroundColor:'rgba(255, 255, 255, 0.7)', backdropFilter: 'saturate(200%) blur(30px)', mx: {xs: 2, lg: 3}}}>
        <OrderPhone />
      </Card>
      <Contacts />
    </Layout>
  )
}
