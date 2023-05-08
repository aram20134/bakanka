import { ThemeProvider } from '@emotion/react'
// import '../styles/globals.css'
import { CssBaseline, getCircularProgressUtilityClass } from '@mui/material'
import { theme }  from '../theme/theme'
import '../theme/global.css'
import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import jwt_decode from "jwt-decode";

export const authProvider = createContext(null)

function MyApp({ Component, pageProps }) {
  // const [admin, setAdmin] = useState(false)

  // useEffect(() => {
  //   console.log('first')
  //   if (getCookie('token')) {
  //     setAdmin(jwt_decode(getCookie('token')))
  //     console.log(admin)
  //   } 
  // }, [])
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
