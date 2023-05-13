import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Image from 'next/image'
import 'react-phone-input-2/lib/material.css'
import GradeIcon from '@mui/icons-material/Grade';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import test from '../assets/bgTESTONLY.jpg'
import { Alert, CircularProgress, FormControl, FormHelperText, LinearProgress, Modal, Rating, Snackbar, Stack, SvgIcon } from '@mui/material'
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import { addReview, getReviews } from '../api/ordersAPI'
import Review from '../components/UI/Review'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '500px',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {xs:2, sm: 5},
  borderRadius: 2
};

const ratingLabels = ['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Ужасно'].reverse()

export const About = () => {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(null)
  const [phone, setPhone] = useState(null)
  const [worth, setWorth] = useState('')
  const [flaws, setFlaws] = useState('')
  const [comment, setComment] = useState('')
  const [name, setName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [spliceState, setSpliceState] = useState(2)
  const [reviews, setReviews] = useState([])
  const [stars, setStars] = useState({})

  useEffect(() => {
    console.log(rating)
  }, [rating])

  const handleReview = () => {
    if (!name || !phone || !rating) {
      if (!rating) setRating(false)
      if (!name) setName(false)
      if (!phone) setPhone(false)
      return
    }
    setLoading(true)
    const day = new Date()
    addReview({phoneNumber: phone, rating, worth, flaws, comment, name, day})
    .then((res) => {
      setOpen(false)
      setOpenSnack(true)
    })
    .finally(() => setLoading(false))
  }
  
  const handleClose = () => {
    setOpen(false)
    setPhone(null)
    setName(null)
    setRating(null)
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const nextReviews = () => {
    getReviews()
    .then((res) => setReviews(res))
  }

  useEffect(() => {
    getReviews()
    .then((res) => setReviews(res))
  }, [])

  useEffect(() => {
    setStars(reviews.reduce((acc, cur) => {
      acc[cur.rating] = (acc[cur.rating] || 0) + 1
      acc['elements'] = (acc['elements'] || 0) + 1
      acc['sum'] = (acc['sum'] || 0) + cur.rating
      return acc
    }, {}))
  }, [reviews])
  
  useEffect(() => {
    console.log(stars)
  }, [stars])
  

  return (
    <Layout title={'О нас'} description={'О нас баканское озеро'}>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Отзыв успешно отправлен!
        </Alert>
      </Snackbar>
      <Container disableGutters maxWidth='lg'>
        <Box mt={15}>
          <Typography color={'info.main'} mb={3} textAlign={'center'} variant='h2'>О нас</Typography>
          <Card sx={{p: 2}}>
            <Grid gap={3} container>
              <Grid item xs={12} sm={6}>
                <Image alt='Баканское озеро' style={{objectFit:'cover', width:'100%', height:'100%'}} src={test} />
              </Grid>
              <Grid item xs>
                <Typography mb={2} variant='h5' textAlign={'center'}>История создания нашего озера</Typography>
                <Typography>
                  Озеро здесь было всегда, но после наводнения на этом месте образовалось болото.
                  <br />
                  <br />
                  Так как это единственный уголок для отдыха вблизи станицы, мы решили заняться его облагораживанием.
                  <br />
                  <br />
                  С тех пор год за годом кипит работа над оформлением территории. 
                  <br />
                  <br />
                  А впереди ещё много нового и интересного, следи за нашими сторис и постами!
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Typography textAlign={'center'} my={3} variant='h2' color={'info.main'}>Наши правила</Typography>
          <Card sx={{p:2}} elevation={10}>
            <Grid container>
              <Typography my={1} variant='body1'>— оплата услуг производится перед началом ловли рыбы у администратора водоёма</Typography>
              <Typography my={1} variant='body1'>— администрация имеет право отказать в услугах лицам в нетрезвом/неадекватном состояниях без объяснения причины</Typography>
              <Typography my={1} variant='body1'>— рыбак обязан убрать лишние снасти по первому требованию администрации</Typography>
              <Typography my={1} variant='body1'>— разделывать и жарить рыбу можно после взвешивания и оплаты</Typography>
              <Typography my={1} variant='body1'>— рыбаки и отдыхающие обязаны соблюдать санитарные нормы</Typography>
              <Typography my={1} variant='body1'>— по окончанию отдыха обязательно приведите место в порядок, необходимо собрать и вынести мусор</Typography>
              <Typography my={1} variant='body1'>— не мешайте другим участникам отдыха</Typography>
              <Typography my={1} variant='body1'>— не рекомендуется залезать на водонапорную башню, будьте осторожны при использовании огня и спуска к воде</Typography>
              <Typography my={1} variant='body1'>— каждый рыбак обязан иметь при себе подсак, на каждого рыбака по 3 удочки</Typography>
              <Typography my={1} variant='body1'>— дополнительный инвентарь (зонты, дрова, подсак) спрашивайте у администратора</Typography>
            </Grid>
          </Card>
          <Typography color={'info.main'} my={3} textAlign={'center'} variant='h2'>Отзывы</Typography>
          <Card elevation={10}>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box component={'form'} sx={style}>
                <Grid gap={2} container>
                  <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h4">Оставить отзыв</Typography>
                  </Grid>
                  <Grid item display={'flex'} gap={1}>
                    <FormControl>
                      <Rating sx={{alignItems:'center', height:'30px'}} value={rating} onChange={(e, newValue) => setRating(newValue)} />
                      {rating === false && <FormHelperText sx={{color:'error.main'}} variant='outlined'>Поставьте оценку</FormHelperText>}
                    </FormControl>
                    <Typography>{ratingLabels[rating - 1]}</Typography>
                  </Grid>
                  <Grid width={'100%'} item>
                    <Stack sx={{width:'100%'}} spacing={2}>
                      <TextField onChange={(e) => setWorth(e.target.value)} maxRows={5} multiline fullWidth label='Достоинства' variant='outlined' />
                      <TextField onChange={(e) => setFlaws(e.target.value)} maxRows={5} multiline fullWidth label='Недостатки' variant='outlined' />
                      <TextField onChange={(e) => setComment(e.target.value)} maxRows={5} multiline fullWidth label='Комментарий' variant='outlined' />
                    </Stack>
                  </Grid>
                  <Divider sx={{width:'100%'}} />
                  <Alert severity='info'>Укажите свой номер телефона и имя, чтобы мы могли подвердить факт приобретения услуги</Alert>
                  <Grid item width={'100%'}>
                    <Stack sx={{width:'100%'}} spacing={2}>
                      <FormControl>
                        <TextField error={name === false} onChange={(e) => setName(e.target.value)} variant='outlined' label='Имя' />
                        {name === false && <FormHelperText sx={{color:'error.main'}} variant='outlined'>Заполните поле</FormHelperText>}
                      </FormControl>
                      <FormControl>
                        <PhoneInput isValid={!(phone === false)} onChange={(e) => setPhone(e)} specialLabel='Телефон' inputStyle={{background:'transparent', height:'60px', width:'100%'}} countryCodeEditable={false} country={'ru'}  />
                        {phone === false && <FormHelperText sx={{color:'error.main'}} variant='outlined'>Заполните поле</FormHelperText>}
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item width={'100%'} textAlign={'center'}>
                    {!loading ? (
                      <Button onClick={handleReview} variant='contained'>Отправить отзыв</Button>
                    ) : (
                      <Button disabled onClick={handleReview} variant='contained'>
                        <CircularProgress size={30} />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Modal>
            <Grid container>
              <Grid width={'100%'} sx={{p:2, backgroundColor:'success.light'}} item>
                <Typography variant='h5'>Отзывы клиентов ({reviews.length})</Typography>
              </Grid>
              <Grid gap={2} sx={{p:{sm:3, xs: 1}}} item container>
                <Grid item xs sm={3}>
                  <Typography variant='h5'>Рейтинг клиентов</Typography>
                  <Rating readOnly size='large' precision={0.25} value={stars.sum / stars.elements} />
                  <Typography variant='h5'><b style={{fontSize:40}}>{((stars.sum / stars.elements) || 0).toFixed(1)}</b> / 5</Typography>
                  <Typography color={'text.disabled'} variant='caption'>На основе {reviews.length} отзывов</Typography>
                </Grid>
                <Grid item xs md={4} width={'100%'}>
                  <Stack position={'relative'} gap={2} direction={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
                    <Typography sx={{position:'absolute', left:13.5, userSelect:'none'}} color={'white'} variant='subtitle2'>5</Typography>
                    <GradeIcon color='warning' fontSize='large' />
                    <LinearProgress variant='determinate' sx={{width:'100%', height:'15px', borderRadius:'5px'}} value={(stars[5] / stars.elements) * 100 || -1} />
                    <Typography variant='subtitle1'>{((stars[5] / stars.elements) * 100 || 0).toFixed(0)}%</Typography>
                  </Stack>
                  <Stack position={'relative'} gap={2} direction={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
                    <Typography sx={{position:'absolute', left:13, userSelect:'none'}} color={'white'} variant='subtitle2'>4</Typography>
                    <GradeIcon color='warning' fontSize='large' />
                    <LinearProgress variant='determinate' sx={{width:'100%', height:'15px', borderRadius:'5px'}} value={(stars[4] / stars.elements) * 100 || -1} />
                    <Typography variant='subtitle1'>{((stars[4] / stars.elements) * 100 || 0).toFixed(0)}%</Typography>
                  </Stack>
                  <Stack position={'relative'} gap={2} direction={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
                    <Typography sx={{position:'absolute', left:14, userSelect:'none'}} color={'white'} variant='subtitle2'>3</Typography>
                    <GradeIcon color='warning' fontSize='large' />
                    <LinearProgress variant='determinate' sx={{width:'100%', height:'15px', borderRadius:'5px'}} value={(stars[3] / stars.elements) * 100 || -1} />
                    <Typography variant='subtitle1'>{((stars[3] / stars.elements) * 100 || 0).toFixed(0)}%</Typography>
                  </Stack>
                  <Stack position={'relative'} gap={2} direction={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
                    <Typography sx={{position:'absolute', left:14, userSelect:'none'}} color={'white'} variant='subtitle2'>2</Typography>
                    <GradeIcon color='warning' fontSize='large' />
                    <LinearProgress variant='determinate' sx={{width:'100%', height:'15px', borderRadius:'5px'}} value={(stars[2] / stars.elements) * 100 || -1} />
                    <Typography variant='subtitle1'>{((stars[2] / stars.elements) * 100 || 0).toFixed(0)}%</Typography>
                  </Stack>
                  <Stack position={'relative'} gap={2} direction={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
                    <Typography sx={{position:'absolute', left:14.5, userSelect:'none'}} color={'white'} variant='subtitle2'>1</Typography>
                    <GradeIcon color='warning' fontSize='large' />
                    <LinearProgress variant='determinate' sx={{width:'100%', height:'15px', borderRadius:'5px'}} value={(stars[1] / stars.elements) * 100 || -1} />
                    <Typography variant='subtitle1'>{((stars[1] / stars.elements) * 100 || 0).toFixed(0)}%</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md>
                  <Stack gap={3} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h5'>Оставь отзыв о Баканском озере!</Typography>
                    <Button startIcon={<ReviewsIcon />} sx={{minWidth:'300px'}} variant='contained' onClick={() => setOpen(true)}>Оставить отзыв</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Card>
          
          {reviews.slice(0, spliceState).map((review) => {
            return (
              <Review key={review._id} review={review} />
            )
          })}
          <Box mt={2} textAlign={'center'}>
            {spliceState > reviews.length 
            ? <Button disabled onClick={() => setSpliceState(prev => prev + 2)} variant='contained'>Загружены все отзывы</Button>
            : <Button onClick={() => setSpliceState(prev => prev + 2)} variant='contained'>Загрузить больше</Button>
            }
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default About