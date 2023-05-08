import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InstagramIcon from './InstagramIcon'
import WhatsapIcon from './WhatsapIcon'
import TelegramIcon from './TelegramIcon'

const Contacts = () => {
  return (
    <Card sx={{p:2, mt: 2, backgroundColor:'rgba(255, 255, 255, 0.7)', backdropFilter: 'saturate(200%) blur(30px)', mx: {xs: 2, lg: 3}, justifyContent:'center', alignItems:'center', display:'flex'}}>
        <Grid maxWidth={'lg'} gap={3} direction={'column'} justifyContent={'center'} alignItems={'center'} container>
          <Grid>
            <Typography color={''} variant='h3'>Связаться с нами</Typography>
          </Grid>
          <Grid xs container justifyContent={'center'} alignItems={'center'}>
            <Grid xs={12} md={6}>
              <YMaps>
                <Grid sx={{width:'100%', height:'100%'}}>
                  <Map  options={{autoFitToViewport:'always'}} style={{width:'100%', height:'100%', maxWidth:'1000px', minHeight:'545px'}} defaultState={{ center: [44.875521, 37.845245], zoom: 13 }}>
                    <Placemark options={{preset:''}} defaultGeometry={[44.875521, 37.845245]} />
                  </Map>
                </Grid>
              </YMaps>
            </Grid>
            <Grid xs={12} md={6} p={5} sx={{backgroundColor:'primary.main', borderBottomRightRadius:5, borderTopRightRadius:5}} gap={2} container justifyContent={'center'} alignItems={'center'}>
              <Grid gap={5} container justifyContent={'space-between'} alignItems={'flex-start'}>
                <Grid xs display={'flex'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                  <LocationOnOutlinedIcon color='warning' sx={{fontSize:100}} />
                  <Typography mb={2} variant='h6' color={'white'} sx={{letterSpacing:'0.2rem'}}>АДРЕС:</Typography>
                  <Typography textAlign={'center'} variant='body2' color={'white'}>Краснодарский край, Крымский р-н, Нижнебаканское сельское поселение, станица Нижнебаканская</Typography>
                </Grid>
                <Grid xs display={'flex'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                  <AccessTimeOutlinedIcon color='warning' sx={{fontSize:100}} />
                  <Typography mb={2} variant='h6' color={'white'} sx={{letterSpacing:'0.2rem'}}>ЧАСЫ РАБОТЫ:</Typography>
                  <Typography variant='body2' color={'white'}>Ежедневно</Typography>
                  <Typography variant='body2' color={'white'}>с 6:00 до 21:00</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid gap={5} container justifyContent={'space-between'} alignItems={'flex-start'}>
                <Grid xs display={'flex'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                  <LocalPhoneOutlinedIcon color='warning' sx={{fontSize:100}} />
                  <Typography mb={2} variant='h6' color={'white'} sx={{letterSpacing:'0.2rem'}}>ПОЗВОНИТЕ НАМ:</Typography>
                  <Typography textAlign={'center'} variant='body2' color={'white'}>+7 918 951-64-99</Typography>
                  <Typography textAlign={'center'} variant='body2' color={'white'}>+ 7 995 005-51-15</Typography>
                </Grid>
                <Grid xs display={'flex'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                  <ShareOutlinedIcon color='warning' sx={{fontSize:100}} />
                  <Typography mb={2} variant='h6' color={'white'} sx={{letterSpacing:'0.2rem'}}>СОЦ. СЕТИ:</Typography>
                  <Stack direction={'row'}>
                    <IconButton LinkComponent={'a'} target='_blank' href='https://instagram.com/bakanskoe_ozero?igshid=ZjE2NGZiNDQ=' color='success'>
                      <InstagramIcon />
                    </IconButton>
                    <IconButton LinkComponent={'a'} target='_blank' href='https://wa.me/message/UW6GFCY26IDVH1' color='success'>
                      <WhatsapIcon />
                    </IconButton>
                    <IconButton LinkComponent={'a'} target='_blank' href='https://t.me/bakanskoe_ozero' color='success'>
                      <TelegramIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
  )
}

export default Contacts