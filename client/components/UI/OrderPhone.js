import { Alert, Box, Button, FormControl, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { orderPhoneApi } from '../../api/ordersAPI'

const OrderPhone = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comm, setComm] = useState('')

  const handleForm = (e) => {
    if (name.trim().length && phone.length > 5) {
      setOpenAlert(false)
      setOpenSuccess(true)
      orderPhoneApi({name, phone, comm}).then((res) => console.log(res))
      setPhone('+7')
      setName('')
      setComm('')
      // axios ...

    } else {
      setOpenSuccess(false)
      setOpenAlert(true)
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  }
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  }

  return (
    <>
     {/* <Snackbar onClose={handleCloseAlert} open={openAlert} autoHideDuration={5000}>
        
      </Snackbar>
      <Snackbar onClose={handleCloseSuccess} open={openSuccess} autoHideDuration={5000}>
        
      </Snackbar> */}
      <Box gap={2} sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', alignItems:'center'}}>
        <Typography textAlign={'center'} variant='h4'>Нужна помощь с бронированием?</Typography>
        <Typography variant='body1'>Свяжитесь с нами по телефону</Typography>
        <Typography variant='h4' color={'info.main'}>+7 918 951-64-99</Typography>
        <Typography variant='body1'>Или оставьте заявку на сайте</Typography>
      </Box>
      <Box mt={5} gap={5} sx={{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%', alignItems:'center'}}>
        <FormControl sx={{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%', alignItems:'center', gap:5}}>
          <Grid xs={6} lg={12} md={3} container maxWidth={'100%'} sx={{flexBasis:{xs:'100%', lg:'auto'}}} item justifyContent={'center'} gap={5} alignItems={'center'}>
            <TextField value={name} onChange={(e) => setName(e.target.value)} required label='Ваше имя' sx={{width:{xs:'100%', lg:'auto'}}} />
            <PhoneInput value={phone} onChange={(e) => setPhone(e)} specialLabel='Телефон' inputStyle={{background:'transparent', height:'60px', width:'100%'}} countryCodeEditable={false} country={'ru'}  />
            <TextField value={comm} onChange={(e) => setComm(e.target.value)} sx={{width:{xs:'100%', lg:'auto'}}} label='Комментарий' />
            <Button onClick={handleForm} variant='contained' sx={{minHeight:'60px', fontSize:'100%', width:{xs:'100%', lg:'auto'}}} size='large' type='submit'>Заказать</Button>
          </Grid>
        </FormControl>    
      </Box>
      <Box m={'1rem auto'} maxWidth={'lg'} display={'flex'} justifyContent={'center'}>
        {openSuccess && <Alert onClose={handleCloseSuccess} elevation={6} variant='filled' severity='success'>
          Заявка успешно отправлена!
        </Alert>}
        {openAlert && <Alert onClose={handleCloseAlert} elevation={6} variant='filled' severity='error'>
          Заполнены не все поля!
        </Alert>}
      </Box>
    </>
  )
}
export default OrderPhone