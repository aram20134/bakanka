import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InfoCard from "./InfoCard";

import img from '../../assets/bgTESTONLY.jpg'
import Image from "next/image";
import DeckIcon from '@mui/icons-material/Deck';
import HotTubIcon from '@mui/icons-material/HotTub';
import PhishingIcon from '@mui/icons-material/Phishing';
import LandscapeIcon from '@mui/icons-material/Landscape';

function Information() {
  return (
    <Box component="section" py={3} my={3}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            {/* <Image  /> */}
            <Image src={img} style={{width:'100%', height:'100%'}} />
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoCard
                  icon={<DeckIcon color="info" fontSize="large" />}
                  title="Беседки"
                  description="Все беседки оснащены мангалом, светом, розетками и дровами. Идеальный набор для вашего отдыха."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoCard
                  icon={<HotTubIcon color="info" fontSize="large" />}
                  title="Баня"
                  description="Уютная и современная баня, где вы сможете полностью расслабиться и забыть о повседневных проблемах."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <InfoCard
                  icon={<PhishingIcon color="info" fontSize="large" />}
                  title="Рыба"
                  description="Любители рыбалки найдут на нашей базе отдыха все условия для успешной ловли рыбы."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoCard
                  icon={<LandscapeIcon color="info" fontSize="large" />}
                  title="Природа"
                  description="Баканское озеро расположено в живописном месте, в окружении чистых лесов и прозрачных рек."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Information;
