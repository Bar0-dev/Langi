import { Box, Typography } from "@mui/material";

const styles = {
  header: {
    marginBottom: (theme) => theme.spacing(4),
  },
};

export const Header = (props) => {
  return (
    <Box sx={styles.header}>
      <Typography variant="h2" component="h1">
        {props.children}
      </Typography>
      {props.subtext ? (
        <Typography color="GrayText" variant="h3" component="h2">
          {props.subtext}
        </Typography>
      ) : null}
    </Box>
  );
};

export const SubHeader = (props) => {
  return (
    <Typography gutterBottom variant="h4" component="h2">
      {props.children}
    </Typography>
  );
};

export const Paragraph = (props) => {
  return (
    <Typography variant="p" component="p">
      {props.children}
    </Typography>
  );
};
