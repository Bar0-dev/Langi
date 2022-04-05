import { Typography } from "@mui/material";

export const Header = (props) => {
    return <Typography variant="h3" component="h1">
    {props.children}
  </Typography>
}

export const SubHeader = (props) => {
    return (
      <Typography variant="h4" component="h2">
        {props.children}
      </Typography>
    );
  };
  
 export const Paragraph = (props) => {
    return (
      <Typography variant="h6" component="p">
        {props.children}
      </Typography>
    );
  };
  