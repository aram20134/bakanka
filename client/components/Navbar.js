import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CottageIcon from '@mui/icons-material/Cottage';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Modal } from '@mui/material';
import { useState } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import 'react-phone-input-2/lib/material.css'
import OrderPhone from './UI/OrderPhone';

import logo from '../public/favicon.png'
import Image from 'next/image';

const pages = [{name: 'Прайс-лист', icon: <ListAltIcon  />, href:'/price-list'}, {name: 'О нас', icon: <InfoIcon />, href:'/about'}, {name: 'Контакты', icon: <ContactsIcon />, href:'/contacts'}, {name: 'Галерея', icon: <CollectionsIcon />, href:'/gallery'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '450px',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: {xs:2, sm: 5},
    borderRadius: 2
  };

  const handleClose = () => {
    setOpen(false)

  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <AppBar color='primary' position="fixed" sx={{maxWidth: 'lg', left: '50%', transform: 'translate(-50%, 20%)', borderRadius:1, zIndex:100}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={'/'}>
            <Stack gap={2} direction={'row'} alignItems={'center'} sx={{display: { xs: 'none', md: 'flex' }}}>
              <Image alt='лого баканское озеро' src={logo} width={50} height={50} />
              <Typography variant="h5" noWrap sx={{ mr: 2, fontWeight: 700, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none',}}>
                Баканское озеро
              </Typography>
            </Stack>
          </Link>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left',}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{display: { xs: 'block', md: 'none' },}}>
              {pages.map(({name, icon, href}) => (
                <Link key={href} href={href}>
                  <MenuItem key={href} onClick={handleCloseNavMenu} sx={{gap:'1rem'}}>
                  {icon}
                  <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{flexGrow:1, flexDirection:'row'}}>
            <Link href={'/'}>
              <Stack sx={{display: { xs: 'flex', md: 'none' }}} direction={'row'} alignItems={'center'} gap={2}>
                <Image alt='лого баканское озеро' src={logo} width={40} height={40} />
                <Typography variant={'h6'} textAlign={'center'} sx={{ mr: 2, fontWeight: 700, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none'}}>
                  Баканское озеро
                </Typography>
              </Stack>
            </Link>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '1rem' } }}>
            {pages.map(({name, icon, href}) => (
              <Link key={name} href={href}>
                <Button key={name} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'flex', alignItems:'center', gap:1 }}>
                  {icon}
                  <Typography variant='body2'>{name}</Typography>
                </Button>
              </Link>
            ))}
          </Box>
          <Modal onClose={handleClose} open={open}>
            <Box sx={style}>
              <OrderPhone />
            </Box>
          </Modal>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <Button sx={{display:{xs: 'flex', sm:'none'}}} onClick={() => setOpen(true)} color='secondary' variant='contained'>
              <PhoneIcon />
            </Button>
            <Button sx={{display:{xs: 'none', sm:'flex'}}} onClick={() => setOpen(true)} startIcon={<PhoneIcon />} color='secondary' variant='contained'>
              <Typography variant='body1'>Заказать звонок</Typography>
            </Button>
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> */}
            {/* </Tooltip> */}
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;