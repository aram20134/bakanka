import React from 'react'
import Layout from '../components/Layout'
import BookingSteps from '../components/BookingSteps'

const Booking = () => {
  return (
    <Layout title={`Бронирование`}>
      <BookingSteps />
    </Layout>
  )
}

export default Booking