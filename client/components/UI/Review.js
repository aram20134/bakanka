import { Box, Button, Chip, Grid, Rating, Stack, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Card from '@mui/material/Card'
import React, { useState } from 'react'
import { changeStatusReview } from '../../api/ordersAPI'

export const Review = ({review, admin = false, setReviews}) => {
  const [isAllowed, setIsAllowed] = useState(review.allowed)

  const changeStatus = ({action, id}) => {
    changeStatusReview({action, id}).then((res) => console.log(res))

    if (action === 'delete') {
      setReviews(prev => prev.filter((review) => review._id !== id))
    } else {
      setIsAllowed(!isAllowed)
    }
  }

  return (
    <Card elevation={5} sx={{mt: 2}}>
      <Grid container p={{sm:3, xs: 1}} gap={2}>
        {admin && (isAllowed ? (
          <Chip color='success' label='Одобрен' />
        ) :  (
          <Chip color='error' label='Не проверен' />
        ))}
        <Grid item xs={12}>
          <Stack flexWrap={'wrap'} direction={'row'} gap={2}>
            <Typography>{review.name}</Typography>
            <Rating readOnly value={review.rating} />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <CalendarMonthIcon fontSize='small' color='action' />
              <Typography color={'text.disabled'} variant='subtitle1'>{new Date(review.day).toLocaleDateString()}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <Typography sx={{maxWidth:'90px', width:'100%'}} variant='subtitle2' color={'success.main'}>Достоинства</Typography>
            <Typography variant='subtitle2' color={'success.main'}>{review.worth}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <Typography sx={{maxWidth:'90px', width:'100%'}} variant='subtitle2' color={'error.main'}>Недостатки</Typography>
            <Typography variant='subtitle2' color={'error.main'}>{review.flaws}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'column'} >
            <Typography variant='subtitle1' color={'text.primary'}>Комментарий</Typography>
            <Typography variant='body2' color={'text.primary'}>{review.flaws}</Typography>
          </Stack>
        </Grid>
        {admin && (
          <>
            <Grid item xs={12}>
              <Stack direction={'row'} alignItems={'center'} gap={3}>
                <Typography sx={{maxWidth:'90px', width:'100%'}} variant='h6' color={'info.main'}>Телефон</Typography>
                <Typography variant='h6' color={'info.main'}>+{review.phoneNumber}</Typography>
              </Stack>
            </Grid>
            <Grid item xs>
              {isAllowed ? (
                <Stack gap={2} direction={'row'} justifyContent={'end'}>
                  <Button onClick={() => changeStatus({action:'disallow', id: review._id})} color='warning' variant='contained'>Отклонить</Button>
                  <Button onClick={() => changeStatus({action:'delete', id: review._id})} color='error' variant='outlined'>Удалить</Button>
                </Stack>
              ) : (
                <Stack gap={2} direction={'row'} justifyContent={'end'}>
                  <Button onClick={() => changeStatus({action:'allow', id: review._id})} color='secondary' variant='contained'>Одобрить</Button>
                  <Button onClick={() => changeStatus({action:'delete', id: review._id})} color='error' variant='outlined'>Удалить</Button>
                </Stack>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  )
}

export default Review