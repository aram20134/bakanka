import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import Layout from '../components/Layout'

import DeckIcon from '@mui/icons-material/Deck';
import HotTubIcon from '@mui/icons-material/HotTub';
import PhishingIcon from '@mui/icons-material/Phishing';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightIcon from '@mui/icons-material/Light';
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined';
import KebabDiningOutlinedIcon from '@mui/icons-material/KebabDiningOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import LoginIcon from '@mui/icons-material/Login';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardPrice from '../components/UI/CardPrice'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { getPriceList } from '../api/ordersAPI'
import { useEffect } from 'react'

const PriceList = ({priceList}) => {

  const showIcon = (title) => {
    switch (title) {
      case 'Беседки':
        return <DeckIcon sx={{fontSize:190}} />
      case 'Бани':
        return <HotTubIcon sx={{fontSize:190}} />
      case 'Рыба':
        return <PhishingIcon sx={{fontSize:190}} />
      case 'Вход':
        return <LoginIcon sx={{fontSize:190}} />
        break;
    
      default:
        break;
    }
  }

  const showAccordion = (title) => {
    switch (title) {
      case 'Беседки':
          return (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon  />}>
                <Typography variant='h6'>Подробно</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>К каждой беседки прилагаются:</Typography>
                <Grid gap={1} container direction={'column'}>
                  <Grid xs={12} sm={2} width={'100%'}>
                    <Chip icon={<LightIcon />} sx={{width:'100%'}} color='info' label='Свет' />
                  </Grid>
                  <Grid xs={12} sm={2} width={'100%'}>
                    <Chip icon={<PowerOutlinedIcon />} sx={{width:'100%'}} color='info' label='Розетки' />
                  </Grid>
                  <Grid xs={12} sm={2} width={'100%'}>
                    <Chip icon={<ForestOutlinedIcon />} sx={{width:'100%'}} color='info' label='Дрова' />
                  </Grid>
                  <Grid xs={12} sm={2} width={'100%'}>
                    <Chip icon={<KebabDiningOutlinedIcon />} sx={{width:'100%'}} color='info' label ='Мангал' />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )
        break;
      default:
        break;
    }
  }

  return (
    <Layout title={'Прайс-лист'} description={'Прайс лист Баканское озеро'}>
      <Container>
        <Box mt={15} maxWidth={'lg'}>
          <Typography textAlign={'center'} variant='h2' color={'info.main'}>Прайс-лист</Typography>
        </Box>
      </Container>
      <Grid direction={'column'} container xs={12} minHeight={''} mt={0} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        {priceList.map((pl) => {
          return (
            <Grid key={pl.title} width={'100%'}>
              <CardPrice icon={showIcon(pl.title)} title={pl.title} rows={pl.rows} booking={pl.booking} href={`/booking?type=${pl.type}`} withHuman={pl.withHumans}>
                {showAccordion(pl.title)}
              </CardPrice>
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}
export default PriceList

export async function getStaticProps() {
  const priceList = await getPriceList()

  return {
    props: {
      priceList
    },
  };
}