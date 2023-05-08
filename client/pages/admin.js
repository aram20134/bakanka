import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import TablePagination from '@mui/material/TablePagination';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import { changeDesc, delOrder, getAdminImages, getAdminReviews, getAllOrders, getReviews, logAdmin } from '../api/ordersAPI'
import Chip from '@mui/material/Chip'
import DeckIcon from '@mui/icons-material/Deck';
import isToday  from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'
import isTomorrow from 'date-fns/isTomorrow'
import isPast from 'date-fns/isPast'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TableFooter from '@mui/material/TableFooter'
import Booking from './booking'
import Link from 'next/link'
import { authProvider } from './_app'
import { Alert, CircularProgress, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import SearchIcon from '@mui/icons-material/Search';
import Review from '../components/UI/Review'
import LandscapeIcon from '@mui/icons-material/Landscape';
import GalleryImages from '../components/GalleryImages'
import { useRouter } from 'next/router'
import BookingSteps from '../components/BookingSteps'

const Admin = ({ IsAdmin }) => {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [admin, setAdmin] = useState(IsAdmin)
  // const {admin, setAdmin} = useContext(authProvider)

  

  const getOrderType = (type) => {
    const types = [{key:'kiosk', title: 'Беседка', icon: <DeckIcon />}, {key:'hottub', title:'Баня'}]
    const filteredType = types.find((t) => t.key === type)
    return (
      <Box display={'flex'} gap={1}>
        {filteredType.icon}
        {filteredType.title}
      </Box>
    )
  }
  
  const getOrderTitle = (arr) => {
    return arr.map((val) => val.title).join(', ')
  }

  const getOrderDate = (day) => {
    if (isTomorrow(parseISO(day))) {
      return <Chip sx={{width:'100%'}} color={'info'} label='Затра' />
    }
    if (isToday(parseISO(day))) {
      return <Chip sx={{width:'100%'}} color={'success'} label='Сегодня' />
    }
    if (isPast(parseISO(day))) {
      return <Chip variant='filled' label={new Date(day).toLocaleDateString()} />
    }
    return <Chip variant='outlined' sx={{width:'100%'}} label={new Date(day).toLocaleDateString()} />
  }

  function useOutsideAlerter(ref, setEdit) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setEdit(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const GetOrderDesc = ({id, d}) => {
    const [desc, setDesc] = useState(d)
    const [editedDesc, setEditedDesc] = useState(d)
    const [edit, setEdit] = useState(false)
    const ref = useRef(null)
    useOutsideAlerter(ref, setEdit)
    
    const submit = (e) => {
      e.preventDefault()
      setEdit(false)
    }

    const submitEdit = () => {
      setEdit(false)
      setDesc(editedDesc)
      setEditedDesc('')
      changeDesc({id, newDesc:editedDesc})
    }

    return (
      <Box maxWidth={'300px'}>
        {!edit ? (
          <>
            <Typography variant='body2'>{desc}</Typography>
            <IconButton onClick={(e) => {e.preventDefault(), e.stopPropagation(), setEdit(true)}}>
              <EditIcon />
            </IconButton>
          </>
        ) : (
          <FormControl component={'form'} onSubmit={submit}>
            <OutlinedInput onClick={(e) => {e.preventDefault(), e.stopPropagation()}} autoFocus onChange={(e) => {e.preventDefault(), e.stopPropagation(), setEditedDesc(e.target.value)}} ref={ref} sx={{fontSize:14}} fullWidth multiline endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={submitEdit} edge='end'>
                  <CheckOutlinedIcon />
                </IconButton>
              </InputAdornment>
            } defaultValue={desc} size='small' placeholder='Примечание' />
          </FormControl>
        )}
      </Box>
    )
  }
  const router = useRouter()

  const DrawChosedList = () => {

    switch (router.query.page) {
      case 'orders':
        const [selected, setSelected] = useState('')
        const isSelected = (id) => selected === id
        const [page, setPage] = useState(0)
        const [rowsPerPage, setRowsPerPage] = useState(5)
        const [orders, setOrders] = useState([])


        const handleSelect = (id) => {
          selected === id ? setSelected(0) : setSelected(id)
        }

        useEffect(() => {
          getAllOrders().then((res) => setOrders(res.sort((a, b) => new Date(b.day) - new Date(a.day))))
        }, [])
      
        return (
          <Grid xs item display={'flex'} flexDirection={'column'} gap={2}>
            <TableContainer elevation={5} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Тип заказа</TableCell>
                    <TableCell>Состав заказа</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Номер</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell align='center'>Итоговая цена</TableCell>
                    <TableCell>Примечание</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : orders).map((row) => {
                    const isItemSelected = isSelected(row._id)
                    console.log(isItemSelected, row._id)
                    
                    return (
                      <TableRow sx={{cursor:'pointer'}} selected={isItemSelected} hover role='checkbox' onClick={(e) => handleSelect(row._id)} key={row._id}>
                        <TableCell>
                          {/* <Checkbox checked={isItemSelected} onClick={(e) => handleSelect(row._id)} /> */}
                          {getOrderType(row.type)}
                        </TableCell>
                        <TableCell>{getOrderTitle(row.title)}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{getOrderDate(row.day)}</TableCell>
                        <TableCell align='center'>{row.totalPrice}</TableCell>
                        <TableCell><GetOrderDesc id={row._id} d={row.description}  /></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]} onRowsPerPageChange={(e) => {setRowsPerPage(parseInt(e.target.value, 10)), setPage(0)}} page={page} rowsPerPage={rowsPerPage} onPageChange={(e, newPage) => setPage(newPage)} count={orders.length} colSpan={3} />
                  </TableRow>
                </TableFooter>
              </Table>
              {!orders.length && <LinearProgress />}
            </TableContainer>
            {selected ? (
                <Button onClick={() => {delOrder(selected), setOrders(prev => prev.filter((order) => order._id !== selected))}} variant='contained' color='error'>Удалить</Button>
              ) : (
                ''
              )
            }
          </Grid>
        )
      case 'booking':
        // const router = useRouter()
        // useEffect(() => {
        //   router.push({pathname:'/admin', query: {page:'booking', type: 'kiosk'}})
        // }, [])
        

        return (
          <Grid item xs>
            <Button onClick={() => router.push({pathname:'/admin', query: {page:'booking', type: 'kiosk'}})}>Беседка</Button>
            <BookingSteps isAdmin={true} />
          </Grid>
        )
      case 'reviews':
        const [reviews, setReviews] = useState([])
        const [search, setSearch] = useState('')
        const [filterRating, setFilterRating] = useState('')

        useEffect(() => {
          console.log('rev')
          getAdminReviews().then((res) => setReviews(res))
        }, [])

        return (
          <Grid item xs>
            <Grid item xs={12}>
              <TextField onChange={(e) => setSearch(e.target.value)} fullWidth size='medium' InputProps={{startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='large'  />
                </InputAdornment>
              )}} variant='outlined' label='Поиск по имени' />
            </Grid>
            <Typography my={1} variant='subtitle2'>Фильтры</Typography>
            <Grid item xs display={'flex'} alignItems={'center'}>
              <FormControl sx={{minWidth:'130px'}}>
                <InputLabel>Рейтинг</InputLabel>
                <Select  label='Рейтинг' onChange={(e) => {setFilterRating(e.target.value), console.log('da')}} value={filterRating}>
                  <MenuItem value={''}>Без фильтра</MenuItem>
                  <MenuItem value={5}><Rating readOnly value={5} /></MenuItem>
                  <MenuItem value={4}><Rating readOnly value={4} /></MenuItem>
                  <MenuItem value={3}><Rating readOnly value={3} /></MenuItem>
                  <MenuItem value={2}><Rating readOnly value={2} /></MenuItem>
                  <MenuItem value={1}><Rating readOnly value={1} /></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Divider sx={{my: 2}} />
            {reviews
            .filter((review) => review.name.toLowerCase().includes(search.toLowerCase()) && (filterRating === '' ? true : review.rating === filterRating))
            .map((review) => <Review setReviews={setReviews} admin key={review._id} review={review} />)}
          </Grid>
        )
      case 'gallery':
        const [images, setImages] = useState([])
        const [adminMode, setAdminMode] = useState(true)
        const [loading, setLoading] = useState(false)

        const refreshImages = () => {
          setLoading(true)
          getAdminImages().then((res) => setImages(res)).finally(() => setLoading(false))
        }

        useEffect(() => {
          refreshImages()
        }, [])
        
        return (
          <Grid item xs minWidth={'320px'}>
            <Box mb={1} display={'flex'} gap={2}>
              <Button variant='outlined' onClick={() => setAdminMode(!adminMode)}>{adminMode ? 'Включить предпросмотр' : 'Выключить предпросмотр'}</Button>
              <Button disabled={loading} onClick={refreshImages} variant='outlined'>{loading ? <CircularProgress size={15} /> : 'Обновить галерею'}</Button>
            </Box>
            <GalleryImages adminMode={adminMode} images={images} setImages={setImages} />
          </Grid>
        )
      default:
        break;
    }
  }

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (!admin) {

    const handleLog = () => {
      setError(false)
      logAdmin({login, password})
      .then((res) => {setAdmin(res), setCookie('token', res, {maxAge: 3686400 })}) // 42d
      .catch((e) => setError(true))
    }
    
    return (
      <Layout title={'Вход'}>
        <Box p={2} sx={{bgcolor:'background.paper'}} ju m={'10rem auto'} maxWidth={'lg'} minHeight={''}>
          <Grid gap={2} container direction={'column'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography textAlign={'center'} variant='h3'>Вход</Typography>
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput onChange={(e) => setLogin(e.target.value)} placeholder='Логин' />
            </Grid>       
            <Grid item xs={12}>
              <OutlinedInput type='password'  onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' />
            </Grid>
            <Grid item>
              <Button onClick={handleLog} size='large' fullWidth>Войти</Button>
            </Grid>
            {error && <Alert severity='error' variant='filled' >Введены неверные данные</Alert>}
          </Grid>
        </Box>
      </Layout>
    )
  }
  
  return (
    <Layout title={'Закулисье'} robots={'noindex, nofollow'}>
      <Box p={2} sx={{bgcolor:'background.paper'}} m={'10rem auto'} maxWidth={'lg'} minHeight={'100vh'}>
        <Grid gap={2} container>
          <Grid item>
            <List>
              <ListItemButton selected={router.query.page === 'orders'} onClick={() => router.push({pathname:'/admin', query: {page: 'orders'}})}>
                <ListItemIcon><ReorderOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Заказы' />
              </ListItemButton>
              <ListItemButton selected={router.query.page === 'booking'} onClick={() => router.push({pathname:'/admin', query: {page: 'booking'}})}>
                <ListItemIcon><CalendarMonthOutlinedIcon /></ListItemIcon>
                <ListItemText primary='Бронь' />
              </ListItemButton>
              <ListItemButton selected={router.query.page === 'reviews'} onClick={() => router.push({pathname:'/admin', query: {page: 'reviews'}})}>
                <ListItemIcon><ReviewsIcon /></ListItemIcon>
                <ListItemText primary='Отзывы' />
              </ListItemButton>
              <ListItemButton selected={router.query.page === 'gallery'} onClick={() => router.push({pathname:'/admin', query: {page: 'gallery'}})}>
                <ListItemIcon><LandscapeIcon /></ListItemIcon>
                <ListItemText primary='Галерея' />
              </ListItemButton>
            </List>
          </Grid>
          <DrawChosedList />
        </Grid>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
  var cookie
  if (hasCookie('token', { req, res })) {
    cookie = getCookie('token', { req, res });
  } else {
    cookie = false
  }
  return {
    props: {
      IsAdmin: cookie
    }
  }
}

export default Admin