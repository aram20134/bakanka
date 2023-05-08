import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import GitHubIcon from "@mui/icons-material/GitHub";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WhatsapIcon from "./UI/WhatsapIcon";
import TelegramIcon from "./UI/TelegramIcon";

function Footer({ company, links, socials, light }) {
  // const { href, name } = company;

  const year = new Date().getFullYear();

  const renderLinks = links.map((link) => (
    <Typography key={link.name} component={Link} href={link.href} variant="body2" color={light ? "white" : "primary"} fontWeight="regular">
      {link.name}
    </Typography>
  ));

  const renderSocials = socials.map((social) => (
    <Typography key={social.link} target='_blank' component={Link} href={social.link} variant="body2" color={light ? "white" : "primary"} fontWeight="regular">
      {social.icon}
    </Typography>
  ));

  return (
    <Box component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={{ xs: 2, lg: 3, xl: 6 }} mb={3}>
            {renderLinks}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack display="flex" direction="row" justifyContent="center" spacing={3} mt={1} mb={3}>
            {renderSocials}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <Typography variant="body2" color={light ? "white" : "primary"}>
            Все права защищены &copy; {year} ЗАО "Баканская Антонина"{" "}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

Footer.defaultProps = {
  links: [
    { href: ".", name: "Главная" },
    { href: "/price-list", name: "Прайс-лист" },
    { href: "/about", name: "О нас" },
    { href: "/contacts", name: "Контакты" },
    { href: "/gallery", name: "Галерея" },
  ],
  socials: [
    { icon: <InstagramIcon fontSize='medium' />, 
      link: "https://instagram.com/bakanskoe_ozero?igshid=ZjE2NGZiNDQ=" },
    {
      icon: <WhatsapIcon fontSize="medium" />,
      link: "https://wa.me/message/UW6GFCY26IDVH1",
    },
    {
      icon: <TelegramIcon fontSize="medium" />,
      link: "https://t.me/bakanskoe_ozero/",
    },
  ],
  light: false,
};

export default Footer;
