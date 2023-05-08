import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CountUp from "react-countup";

const CounterCard = ({ color = 'info.main', count, title, description, ...rest }) => {
  return (
    <Box width={'100%'} p={2} textAlign={'center'} lineHeight={1}>
      <Typography textAlign={'center'} variant='h2' color={color}>
        <CountUp end={count} duration={1} {...rest} />
      </Typography>
      {title && (
        <Typography variant="h5" mt={1} mb={1}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text">
          {description}
        </Typography>
      )}
    </Box>
  )
}

export default CounterCard