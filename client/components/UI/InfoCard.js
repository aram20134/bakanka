
import Icon from "@mui/material/Icon";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function InfoCard({ color = 'info.main', icon, title, description, direction = 'left', small = 'false' }) {
  return (
    <Box lineHeight={1} p={direction === "center" ? 2 : 0} textAlign={direction}>
      {typeof icon === "string" ? (
        <Typography
          display="block"
          variant={direction === "center" ? "h2" : "h3"}
          color={color}
          textGradient
        >
          {" "}
          <Icon>{icon}</Icon>{" "}
        </Typography>
      ) : (
        icon
      )}
      <Typography
        display="block"
        variant="5"
        fontWeight="bold"
        mt={direction === "center" ? 1 : 2}
        mb={1.5}
      >
        {title}
      </Typography>
      <Typography
        display="block"
        variant={small ? "button" : "body2"}
        color="text"
        pr={direction === "left" ? 6 : 0}
        pl={direction === "right" ? 6 : 0}
      >
        {description}
      </Typography>
    </Box>
  );
}



export default InfoCard;
