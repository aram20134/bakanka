import { useEffect, useState } from 'react'
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
import { addOrder, getOrders } from '../api/ordersAPI'
import Chip from '@mui/material/Chip'

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Alert } from '@mui/material'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const types = [{key: 'kiosk', name:['Беседка', 'Беседки']}]
const steps = ['Выберите дату посещения', 'Выберите беседку', 'Оплата']
const allTypesKiosk = [{title: 'Беседка №1', price: 1500, typePrice: 'руб/день'}, {title: 'Беседка №2', price:1500, typePrice: 'руб/день'}, {title: 'Беседка №3', price:1500, typePrice: 'руб/день'}, {title: 'Большая беседка', price:2500, typePrice: 'руб/день'}]

const BookingSteps = ({isAdmin}) => {
  const router = useRouter()
  const [type, setType] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [chosedDate, setChosedDate] = useState(null)
  const [chosedBooking, setChosedBooking] = useState([])
  const [orderedBooking, setOrderedBooking] = useState([])
  const [markers, setMarkers] = useState([{top: 47.564921596283085, left: 58.13356164383562, itemNumber: 0, label:'Беседка №1', disabled: false, price:1500, typePrice: 'руб/день'}, {top: 31.42288226997428, left: 56.93493150684932, itemNumber: 1, label: 'Беседка №2', price:1500, typePrice: 'руб/день'}, {top: 25.26341989546171, left: 37.071917808219176, itemNumber: 2, label:'Беседка №3', price:1500, typePrice: 'руб/день'}, {top: 50.21986227495229, left: 36.215753424657535, itemNumber: 3, label:'Большая беседка', price:2500, typePrice: 'руб/день'}])
  // const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setChosedBooking([])
  }, [chosedDate])

  useEffect(() => {
    console.log(chosedBooking)
  }, [chosedBooking])
  
  useEffect(() => {
    if (activeStep === steps.length) {
      const fullPrice = chosedBooking.reduce((acc, cur) => {
        acc += cur.price
        return acc
      }, 0)
      addOrder({day: chosedDate, title: chosedBooking, type: type.key, email:'dasigty@gmail.com', phoneNumber: '+79042292492', totalPrice: fullPrice})
      .then((data) => console.log(data))
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
  
  const goToLowerCase = (string) => {
    return string.slice(0, 1).toLowerCase() + string.slice(1) 
  }

  const goBack = () => {
    setActiveStep(prev => prev === 0 ? 0 : prev - 1)
  }
  
  const goNext = () => {
    setActiveStep(prev => prev === steps.length ? prev : prev + 1)
  }

  

  const CustomMarker = ({label, itemNumber, price, typePrice}) => {
    const isChosed = chosedBooking.filter((val) => val.title === label).length > 0 ? true : false
    const ordered = orderedBooking.filter((val) => val.title === label).length > 0 ? true : false
    console.log(typePrice)
    if (ordered) {
      return (
        <Box  display={'flex'} flexDirection={'column'} gap={0} alignItems={'center'}>
          <Typography sx={{textShadow:'0 0 15px #000000'}} color={'error.light'} variant='h5'>{label}</Typography>
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
        <Typography sx={{textShadow:'0 0 15px #000000'}} color={'primary.light'} variant='h5'>{label}</Typography>
        <IconButton size='large'>
          <Badge color='secondary' badgeContent={price + ' Р' } max={9999}>
            <DeckIcon sx={{fontSize:60}} color='info' />
          </Badge>
        </IconButton>
        <Button onClick={() => setChosedBooking(prev => [...prev, {title:label, price, typePrice}])} variant='contained'>Выбрать</Button>
      </Box>
    ) : (
      // sx={{transform:{xs: `translate(-100%, -100%)`, sm: `translate(-50%, -50%)`}, scale:{xs: '0.5', sm: '1'}}} 
      <Box display={'flex'} flexDirection={'column'} gap={0} alignItems={'center'}>
        <Typography sx={{textShadow:'0 0 15px #000000'}} color={'success.light'} variant='h5'>{label}</Typography>
        <IconButton size='large'>
          <Badge color='secondary' badgeContent={price + ' Р'} max={9999}>
            <DeckIcon sx={{fontSize:60}} color='success' />
          </Badge>
        </IconButton>
        <Button color='success' onClick={() => setChosedBooking(prev => prev.filter((val) => val.title !== label))} variant='contained'>Отменить</Button>
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
              <Typography>Выбранная дата:</Typography>
              <DateField disablePast value={chosedDate} onChange={(date) => setChosedDate(date)}  />
            </LocalizationProvider>
          </Box>
        )
      case 1:
        return (
          <Box p={2}>
            <ImageMarker markerComponent={CustomMarker} alt='map' markers={markers} src={bgMap.src} />
            <Autocomplete isOptionEqualToValue={(opt, value) => opt.title === value.title} value={chosedBooking} onChange={(e, newValue) => setChosedBooking(newValue)} sx={{mt:2}} multiple options={allTypesKiosk.filter((val) => !orderedBooking.find((ordered) => val.title === ordered.title))} getOptionLabel={(opt) => opt.title} 
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
        )
      case 2:
        const label = chosedBooking.map((val) => val.title).join(', ')
        const fullPrice = chosedBooking.reduce((acc, cur) => {
          acc += cur.price
          return acc
        }, 0)

        return (
          <Box p={2} display={'flex'} flexDirection={'column'} gap={2} alignItems={'flex-start'}>
            <Typography variant='h5'>Итог</Typography>
            <List sx={{maxWidth:'lg'}}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor:'success.main'}}>
                    <DeckIcon  />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Беседка' secondary={label} />
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
                      <TableCell scope='row'>{row.title}</TableCell>
                      <TableCell align='right'>{row.price + ' ' + row.typePrice}</TableCell>
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
          </Box>
        )
      case 3: 
        return (
          <Box p={2}>
            <Alert severity='success'>Успешно забронировано</Alert>
          </Box>
        )
      default:
        break;
    }
  }

  const drawStepButtons = (i) => {
    switch (i) {
      case 0:
        return (
          <>
            <Button disabled sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button disabled={!chosedDate && true} sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
          </>
        )
      case 1:
        return (
          <>
            <Button sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button disabled={!chosedBooking.length && true} sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
          </>
        )
      case 2:
        return (
          <>
            <Button sx={{fontSize:'1rem'}} onClick={goBack}>Назад</Button>
            <Button sx={{fontSize:'1rem'}} onClick={goNext}>Вперед</Button>
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
          <Typography textAlign={'center'} variant='h2' color={'info.main'}>Бронирование {goToLowerCase(type.name[1])}</Typography>
        </Box>
        <Box maxWidth={'lg'} width={'100%'} mt={5}>
          <Card sx={{p:2}}>
            <Stepper sx={{alignItems:'center'}} orientation={orientation} alternativeLabel={orientation === 'vertical' ? false : true} activeStep={activeStep}>
              {steps.map((label, i) => {
                var opt = ''
                if (i === 0 && chosedDate) {
                  opt = new Date(chosedDate).toLocaleDateString()
                }
                if (i === 1 && chosedBooking.length > 0) {
                  const allOpts = chosedBooking.map((val) => val.title)
                  const label = allOpts.length > 1 ? 'Беседок ' + allOpts.length : allOpts
                  opt = 'Выбрано: ' + label
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
              {drawStepButtons(activeStep)}
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default BookingSteps