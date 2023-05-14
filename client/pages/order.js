import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { acceptOrder, getOrderById, getPaymentInfo } from '../api/ordersAPI'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Layout from '../components/Layout';
import DeckIcon from '@mui/icons-material/Deck';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import HotTubIcon from '@mui/icons-material/HotTub';

const Order = ({order, payment}) => {
  const router = useRouter()
  const [orderRes, setOrder] = useState(order)
  const [paymentRes, setPayment] = useState(payment)

  useEffect(() => {
    console.log(orderRes)
    console.log(paymentRes)

  }, [])
  
  const label = orderRes.title.map((val) => val.title).join(', ')
  

  return paymentRes.status === 'succeeded' ? (
    <Layout title={'Успешное бронирование'} robots={'noindex, nofollow'}>
      <Container disableGutters sx={{mt:15}}>
        <Box maxWidth={'lg'} textAlign={'center'}>
          <CheckCircleIcon color='success' sx={{fontSize:100}} />
          <Typography textAlign={'center'} variant='h3' color={'success.main'}>Успешно забронировано</Typography>
          <List sx={{maxWidth:'lg'}}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor:'success.main'}}>
                    {orderRes.type === 'kiosk' ? (
                      <DeckIcon  />
                    ) : (
                      <HotTubIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={orderRes.type === 'kiosk' ? 'Беседка' : 'Баня'} secondary={label} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{bgcolor:'success.main'}}>
                    <InsertInvitationOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Дата' secondary={new Date(orderRes.day).toLocaleDateString()} />
              </ListItem>
            </List>
            <TableContainer elevation={5} component={Paper}>
              <Table sx={{width:'100%'}}>
                <TableBody>
                  {orderRes.title.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell scope='row'>{row.title}</TableCell>
                      {orderRes.type === 'kiosk' ? (
                        <TableCell align='right'>{row.price + ' ' + row.typePrice}</TableCell>
                      ) : (
                        <TableCell align='right'>{Number(row.title.slice(10, 11)) * row[0].price + ' ' + row[0].typePrice}</TableCell>
                      )}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}><Divider sx={{width:'100%'}} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontWeight:'bold'}} scope='row'>Итоговая цена</TableCell>
                    <TableCell sx={{fontWeight:'bold'}} align='right'>{orderRes.totalPrice} Руб</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
      </Container>
    </Layout>
  ) : (
    <Layout title={'Ошибка бронирования'}>
      <Container disableGutters sx={{mt:15}}>
        <Box maxWidth={'lg'} textAlign={'center'}>
          <ErrorIcon color='error' sx={{fontSize:100}} />
          <Typography textAlign={'center'} variant='h3' color={'error.main'}>Ошибка бронирования</Typography>
          <Typography variant='body1'>Оплата не прошла, попробуйте ещё раз или свяжитесь с нами</Typography>
        </Box>
      </Container>
    </Layout>
  )
}

export default Order


export async function getServerSideProps({req, res, params, query}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  
  const order = await getOrderById(query.order)
  const payment = await getPaymentInfo(query.payment)

  if (payment.metadata.orderId === order._id) {
    await acceptOrder(query.order)
  } else {
    return {
      notFound: true
    }
  }

  if (!order || !payment) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      order, payment
    }
  }
}
