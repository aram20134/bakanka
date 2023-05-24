import React from 'react'
import Layout from '../components/Layout'
import BookingSteps from '../components/BookingSteps'
import { getPriceList } from '../api/ordersAPI'

const Booking = ({priceList}) => {
  return (
    <Layout title={`Бронирование`} description={'Бронирование баканское озеро'}>
      <BookingSteps priceList={priceList} />
    </Layout>
  )
}

export default Booking 

export async function getStaticProps() {
  const priceList = await getPriceList()

  return {
    props: {
      priceList
    },
    revalidate: 10
  };
}