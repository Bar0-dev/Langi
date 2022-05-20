import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const LinkButton = function (props) {
  return (
    <Button component={Link} to={props.to} {...props}>
      {props.children}
    </Button>
  );
};

export default LinkButton;
