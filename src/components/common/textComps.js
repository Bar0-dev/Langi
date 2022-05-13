import { Typography } from "@mui/material";

export const Header = (props) => {
  return (
    <Typography variant="h1" component="h1">
      {props.children}
    </Typography>
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
