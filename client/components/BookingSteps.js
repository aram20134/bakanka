import { memo, useEffect, useState } from 'react'
import Layout from '../components/Layout'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent'
import DeckIcon from '@mui/icons-material/Deck';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';

import ru from 'date-fns/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateField } from '@mui/x-date-pickers/DateField'
import ImageMarker from 'react-image-marker'
import IconButton from '@mui/material/IconButton'

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import bgMap from '../assets/bgMap3.png'
import { acceptOrder, addOrder, getOrders, getPriceYandex, verifyToken } from '../api/ordersAPI'
import Chip from '@mui/material/Chip'

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Alert, FormControl, Stack } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import HotTubIcon from '@mui/icons-material/HotTub';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const types = [{key: 'kiosk', name:['Беседка', 'Беседки'], steps: ['Выберите дату посещения', 'Выберите беседку', 'Оплата']}, {key: 'bath', name: ['Баня', 'Бани'], steps: ['Выберите дату посещения', 'Дополнительно', 'Оплата']}]

const BookingSteps = ({priceList}) => {
  const router = useRouter()
  const [type, setType] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [chosedDate, setChosedDate] = useState(null)
  const [chosedBooking, setChosedBooking] = useState([])
  const [orderedBooking, setOrderedBooking] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [priceListFiltered, setPriceListFiltered] = useState([])
  const [markers, setMarkers] = useState([{top: 47.564921596283085, left: 58.13356164383562, title:'Беседка №1', type: 'Малая'}, {top: 31.42288226997428, left: 56.93493150684932, title: 'Беседка №2', type: 'Малая'}, {top: 25.26341989546171, left: 37.071917808219176, title:'Беседка №3', type: 'Малая'}, {top: 50.21986227495229, left: 36.215753424657535, title:'Большая беседка', type: 'Большая'}])
  // const [loaded, setLoaded] = useState(false)
  

  useEffect(() => {
    if (type?.key !== 'bath') {
      setChosedBooking([])
    }
  }, [chosedDate, type])

  useEffect(() => {
    if (router.query.mode === 'admin') {
      verifyToken(getCookie('token')).then((tk) => {
        setIsAdmin(true)
        setCookie('token', tk)
      }).catch(() => setIsAdmin(false))
    }
  }, [router])
  
  useEffect(() => {
    if (activeStep === 2 && !isAdmin) {
      console.log(router.query.mode)
      var fullPrice
        if (type.key === 'kiosk') {
          fullPrice = chosedBooking.reduce((acc, cur) => {
            acc += Number(cur.price)
            return acc
          }, 0)
        } else {
          fullPrice = numberHours * chosedBooking[0].price
        }
      var checkout
      addOrder({day: chosedDate, title: {...chosedBooking, title: `${numberHuman} чел. на ${numberHours} ч`}, type: type.key, name, phoneNumber: phone, totalPrice: fullPrice}).then((order) => {
        getPriceYandex({value: fullPrice, description: 'Бронирование беседок', metadata: {orderId: order._id}}).then((payment) => {
          checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: payment.confirmation.confirmation_token, //Токен, который перед проведением оплаты нужно получить от ЮKassa
            return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/order?type=${type.key}&payment=${payment.id}&order=${order._id}`, //Ссылка на страницу завершения оплаты
            error_callback: function(error) {
                //Обработка ошибок инициализации
                console.log(error)
            }
          });
          checkout.render('payment-form')
        })
      })
    }
  }, [activeStep])
  
  useEffect(() => {
    if (chosedDate) {
      getOrders({type: type.key, day: chosedDate})
      .then((res) => 
        setOrderedBooking(res.reduce((acc, cur) => {
          acc.push(...cur.title)
          return acc
        }, []))
      )
    }
  }, [chosedDate])

  useEffect(() => {
    // setMarkers(prev => prev.filter((val) => ))
    console.log(orderedBooking)
  }, [orderedBooking])
  

  useEffect(() => {
    setType(types.filter((type) => type.key === router.query.type)[0])
  }, [router])

  useEffect(() => {
    if (type?.key && priceListFiltered?.rows) {
      // .filter((price) => price.rows.name === prev.type)
      console.log(priceListFiltered.rows)
      if (type.key === 'bath') {
        setChosedBooking(priceListFiltered.rows)
      }
      setMarkers(prev => prev.map((marker) => ({...marker, ...priceListFiltered.rows.filter((row) => row.name === marker.type)[0]})))
    }
  }, [type, priceListFiltered])

  useEffect(() => {
    console.log(priceListFiltered)
  }, [priceListFiltered])
  

  useEffect(() => {
    if (type) {
      setPriceListFiltered(priceList.filter((list) => list.type === type.key)[0])
    }
  }, [type])
  
  
  
  const goToLowerCase = (string) => {
    return string.slice(0, 1).toLowerCase() + string.slice(1) 
  }

  const goBack = () => {
    setActiveStep(prev => prev === 0 ? 0 : prev - 1)
  }
  
  const goNext = () => {
    setActiveStep(prev => prev === type.steps.length ? prev : prev + 1)
  }

  useEffect(() => {
    console.log(markers)
  }, [markers])

  const [numberHuman, setNumberHuman] = useState(1)
  const [numberHours, setNumberHours] = useState(2)
  
  

  const CustomMarker = ({title, price, typePrice}) => {
    const isChosed = chosedBooking.filter((val) => val.title === title).length > 0 ? true : false
    const ordered = orderedBooking.filter((val) => val.title === title).length > 0 ? true : false
    console.log(typePrice)
    if (ordered) {
      return (
        <Box  display={'flex'} flexDirection={'column'} gap={0} alignItems={'center'}>
          <Typography sx={{textShadow:'0 0 15px #000000'}} color={'error.light'} variant='h5'>{title}</Typography>
          <IconButton size='large'>
            <DeckIcon sx={{fontSize:60}} color='error' />
          </IconButton>
          <Button color='error' variant='contained'>Занято</Button>
        </Box>
      )
    }
    
    return !isChosed ? (
      // sx={{transform:{xs: `translate(-100%, -100%)`, sm: `translate(-50%, -50%)`}, scale:{xs: '0.5', sm: '1'}}}
      <Box  display={'flex'} flexDirection={'column'} gap={0} alignItems={'center'}>
        <Typography sx={{textShadow:'0 0 15px #000000'}} color={'primary.light'} variant='h5'>{title}</Typography>
        <IconButton size='large'>
          <Badge color='secondary' badgeContent={price + ' Р' } max={9999}>
            <DeckIcon sx={{fontSize:60}} color='info' />
          </Badge>
        </IconButton>
        <Button onClick={() => setChosedBooking(prev => [...prev, {title, price, typePrice}])} variant='contained'>Выбрать</Button>
      </Box>
    ) : (
      // sx={{transform:{xs: `translate(-100%, -100%)`, sm: `translate(-50%, -50%)`}, scale:{xs: '0.5', sm: '1'}}} 
      <Box display={'flex'} flexDirection={'column'} gap={0} alignItems={'center'}>
        <Typography sx={{textShadow:'0 0 15px #000000'}} color={'success.light'} variant='h5'>{title}</Typography>
        <IconButton size='large'>
          <Badge color='secondary' badgeContent={price + ' Р'} max={9999}>
            <DeckIcon sx={{fontSize:60}} color='success' />
          </Badge>
        </IconButton>
        <Button color='success' onClick={() => setChosedBooking(prev => prev.filter((val) => val.title !== title))} variant='contained'>Отменить</Button>
      </Box>
    )
  }

  const drawStepContent = (i) => {

    switch (i) {
      case 0:
        return (
          <Box p={0} flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{width:'100%'}}>
            <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
              <DateCalendar disablePast value={chosedDate} onChange={(date) => setChosedDate(date)} />
              <Stack mt={1} gap={1}>
                <DateField required label='Дата' disablePast value={chosedDate} onChange={(date) => setChosedDate(date)}  />
                <TextField required onChange={(e) => setName(e.target.value)} label='Имя' />
                <PhoneInput value={phone} onChange={(e) => setPhone(e)} specialLabel='Телефон' inputStyle={{background:'transparent', height:'60px', width:'100%'}} countryCodeEditable={false} country={'ru'}  />
              </Stack>
              {type.key === 'bath' && orderedBooking.length ? 
              <Alert sx={{mt:2}} severity='warning'>На этот день нет свободных бань</Alert> : ''}
            </LocalizationProvider>
          </Box>
        )
      case 1:
        return (
          type.key === 'kiosk' ? (
            <Box p={2}>
              <ImageMarker markerComponent={CustomMarker} alt='map' markers={markers} src={bgMap.src} />
              <Autocomplete isOptionEqualToValue={(opt, value) => opt.title === value.title} value={chosedBooking} onChange={(e, newValue) => setChosedBooking(newValue)} sx={{mt:2}} multiple options={markers.filter((val) => !orderedBooking.find((ordered) => val.label === ordered.title))} getOptionLabel={(opt) => opt.title} 
                renderOption={(props, option, {selected}) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                    {option.title}
                  </li>
                )} 
                renderInput={(params) => (
                  <TextField {...params} label='Выбранные беседки' />
                )}
              />
            </Box>
          ) : (
            <Box p={2} gap={2} textAlign={'center'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant='h5'>Заполните дополнительные поля</Typography>
              <form style={{display:'flex', flexDirection:'column', gap:20}} id='form' onSubmit={goNext} onInvalid={(e) => console.log('err')}>
                <TextField value={numberHuman} onChange={(e) => setNumberHuman(e.target.value)} onInvalid={() => console.log('first')} defaultValue={1} required sx={{minWidth:'200px'}} type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: 4, min: 1 }} helperText='Не более 4 людей' label='Кол-во людей' />
                <TextField value={numberHours} onChange={(e) => setNumberHours(e.target.value)} type='number' defaultValue={2} required helperText='не менее 2 часов' label='Кол-во часов' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: 10, min: 2 }} />
              </form>
              <Typography variant='subtitle1'>Цена: {numberHours * chosedBooking[0].price} рублей</Typography>
            </Box>
          )
        )
      case 2:
        const label = chosedBooking.map((val) => val.title).join(', ')

        var fullPrice
        if (type.key === 'kiosk') {
          fullPrice = chosedBooking.reduce((acc, cur) => {
            acc += Number(cur.price)
            return acc
          }, 0)
        } else {
          fullPrice = numberHours * chosedBooking[0].price
        }
        
        return (
          <Box p={2} display={'flex'} flexDirection={'column'} gap={2} alignItems={'flex-start'}>
            <Typography variant='h5'>Итог</Typography>
            <List sx={{maxWidth:'lg'}}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor:'success.main'}}>
                    {type.key === 'kiosk' ? (
                      <DeckIcon  />
                    ) : (
                      <HotTubIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={type.key === 'kiosk' ? 'Беседка' : 'Баня'} secondary={label} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor:'success.main'}}>
                    <InsertInvitationOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Дата' secondary={new Date(chosedDate).toLocaleDateString()} />
              </ListItem>
            </List>
            <TableContainer elevation={5} component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableBody>
                  {chosedBooking.map((row) => (
                    <TableRow key={row.title}>
                      {type.key === 'kiosk' ? (
                        <>
                          <TableCell scope='row'>{row.title}</TableCell>
                          <TableCell align='right'>{row.price + ' ' + row.typePrice}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell scope='row'>{row.title} на {numberHours} часа(-ов)</TableCell>
                          <TableCell align='right'>{fullPrice + ' ' + row.typePrice}</TableCell>
                        </>
                      )}
                      
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}><Divider sx={{width:'100%'}} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontWeight:'bold'}} scope='row'>Итоговая цена</TableCell>
                    <TableCell sx={{fontWeight:'bold'}} align='right'>{fullPrice} Руб</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {isAdmin ? (
              <>
                <Typography alignSelf={'center'} color={'info.main'} variant='h5'>Нажмите на кнопку для брони</Typography>
                {type.key === 'kiosk' ? (
                  <Button onClick={() => addOrder({day: chosedDate, title: chosedBooking, type: type.key, name, phoneNumber: phone, totalPrice: fullPrice}).then((order) => {setActiveStep(3), acceptOrder(order._id)})} sx={{alignSelf:'center'}} variant='contained' color='success'>Забронировать</Button>
                ) : (
                  <Button onClick={() => addOrder({day: chosedDate, title: {...chosedBooking, title: `${numberHuman} чел. на ${numberHours} ч`}, type: type.key, name, phoneNumber: phone, totalPrice: fullPrice}).then((order) => {setActiveStep(3), acceptOrder(order._id)})} sx={{alignSelf:'center'}} variant='contained' color='success'>Забронировать</Button>
                )}
              </>
            ) : (
              <>
                <Typography alignSelf={'center'} color={'info.main'} variant='h5'>Выберите способ оплаты</Typography>
                <div style={{alignSelf:'center'}} id="payment-form"></div>
              </>
            )}
          </Box>
        )
      case 3: 
        return (
          <Box p={2} display={'flex'} flexDirection={'column'} gap={'15px'}>
            <Alert severity='success'>Успешно забронировано</Alert>
            <Button component={Link} href='/admin?page=orders' variant='contained' color='primary'>Вернуться в админ панель</Button>
          </Box>
        )
      default:
        break;
    }
  }

  const DrawStepButtons = ({i}) => {

    switch (i) {
      case 0:
        return type === 'kiosk' ? (
          <>
            <Button disabled sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button disabled={(name.length > 1 && phone.length > 10 && chosedDate) ? false : true} sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
          </>
        ) : (
          <>
            <Button disabled sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button disabled={(name.length > 1 && phone.length > 10 && chosedDate && !orderedBooking.length) ? false : true} sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
          </>
        )
      case 1:
        return type === 'kiosk' ? (
          <>
            <Button sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button onClcik={goNext} disabled={!chosedBooking.length && true} sx={{fontSize:'1rem'}}>Вперед</Button>
          </>
        ) : (
          <>
            <Button sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button form='form' type='submit' disabled={!chosedBooking.length && true} sx={{fontSize:'1rem'}}>Вперед</Button>
          </>
        )
      case 2:
        return (
          <>
            <Button sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button disabled sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
          </>
        )
      default:
        break;
    }
  }
  
  const orientation = useMediaQuery('(min-width:600px)') ? 'horizontal' : 'vertical'

  return type && (
    <>
      <Container disableGutters>
        <Box mt={15} maxWidth={'lg'}>
          <Typography textAlign={'center'} variant='h3' color={'info.main'}>Бронирование {goToLowerCase(type.name[1])}</Typography>
          {isAdmin && <Typography textAlign={'center'} variant='subtitle1' color={'error.main'}>Режим Администратора</Typography>}
        </Box>
        <Box maxWidth={'lg'} width={'100%'} mt={5}>
          <Card sx={{p:2}}>
            <Stepper sx={{alignItems:'center'}} orientation={orientation} alternativeLabel={orientation === 'vertical' ? false : true} activeStep={activeStep}>
              {type.steps.map((label, i) => {
                var opt = ''
                if (i === 0 && chosedDate) {
                  opt = new Date(chosedDate).toLocaleDateString()
                }
                if (i === 1 && chosedBooking.length > 0 && type.key === 'kiosk') {
                  const allOpts = chosedBooking.map((val) => val.title)
                  const label = allOpts.length > 1 ? 'Беседок ' + allOpts.length : allOpts
                  opt = 'Выбрано: ' + label
                }
                if (i === 1 && chosedBooking.length > 0 && type.key === 'bath') {
                  opt = 'Выбрано: Баня'
                }
                return (
                  <Step key={label}>
                    <StepLabel optional={<Typography variant='body2'>{opt}</Typography>}>{label}</StepLabel>
                    {/* <StepContent>{i}</StepContent> */}
                  </Step>
                )
              })}
              
            </Stepper>
            {drawStepContent(activeStep)}
            <Box mt={2} display={'flex'} justifyContent={'space-between'}>
              <DrawStepButtons i={activeStep} />
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default BookingSteps