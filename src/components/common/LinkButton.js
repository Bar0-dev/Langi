import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const LinkButton = function (props) {
  return (
    <Button
      component={Link}
      to={props.link}
      onClick={props.onClick}
      color="inherit"
      variant="text"
    >
      {props.text}
    </Button>
  );
};

export default LinkButton;
