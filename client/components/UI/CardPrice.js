import DeckIcon from '@mui/icons-material/Deck';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

const CardPrice = ({icon, title, rows, withHuman = true, description, children, href, booking = true}) => {
  return (
    <>
      <Container>
        <Box mt={5} maxWidth={'lg'}>
          <Card elevation={10}>
            <Typography mb={3} textAlign={'center'} variant='h4'>{title}</Typography>
            <Grid gap={5} alignItems={'center'}  justifyContent={'center'} container>
              <Grid display={'flex'} xs={12} sm={6} item sx={{justifyContent:{xs:'center', sm:'flex-end'}}} alignItems={'center'}>
                {icon}
              </Grid>
              <Grid xs item p={2}>
                <TableContainer elevation={10} component={Paper}>
                  <Table sx={{ minWidth: '100%' }} aria-label="price list">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{fontWeight:'bold'}}>{title}</TableCell>
                        {withHuman && <TableCell sx={{fontWeight:'bold'}} align="right">Макс. кол-во людей</TableCell>}
                        <TableCell sx={{fontWeight:'bold'}} align="right">Цена</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.name ? row.name : row.title}
                          </TableCell>
                          {withHuman && <TableCell align="right">{row.human}</TableCell>}
                          <TableCell align="right">{row.price + ' ' + row?.typePrice}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {booking && <Box p={2} sx={{width:'100%'}} justifyContent={'center'} display={'flex'}>
              <Link style={{width:'100%'}} href={href}>
                <Button variant='contained' sx={{width:'100%'}}>Забронировать</Button>
              </Link>
            </Box>}
              {children}
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default CardPrice