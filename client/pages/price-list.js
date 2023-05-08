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

const besedki = [{name:'Малая', human: 'до 10 чел', price: '1500 руб/день'}, {name:'Большая', human: 'до 30 чел', price: '2500 руб/день'}]
const bani = [{name:'Баня', human: 'до 4 чел', price: '1500 руб/ч'}]
const fishes = [{name:'Карп, амур', price: '300 руб/кг'}, {name:'Судак', price: '500 руб/кг'}, {name: 'Карась', price:'Бесплатно'}]

const PriceList = () => {
  return (
    <Layout title={'Прайс-лист'}>
      <Container>
        <Box mt={15} maxWidth={'lg'}>
          <Typography textAlign={'center'} variant='h2' color={'info.main'}>Прайс-лист</Typography>
        </Box>
      </Container>
      <Grid direction={'column'} container xs={12} minHeight={''} mt={0} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Typography mb={3} textAlign={'center'} variant='subtitle'>{'Вход для рыбаков - 200 руб. Для остальных бесплатно.'}</Typography>
        <Grid width={'100%'}>
          <CardPrice href={'/booking?type=kiosk'} rows={besedki} title={'Беседки'} icon={<DeckIcon sx={{fontSize:190}} />}>
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
          </CardPrice>
        </Grid>
        <Grid width={'100%'}>
          <CardPrice booking={false} href='/' rows={bani} title={'Баня'} icon={<HotTubIcon sx={{fontSize:190}} />} />
        </Grid>
        <Grid width={'100%'}>
          <CardPrice booking={false} href={'/'} withHuman={false} rows={fishes} title={'Рыба'} icon={<PhishingIcon sx={{fontSize:190}} />} />
        </Grid>
      </Grid>
    </Layout>
  )
}
export default PriceList