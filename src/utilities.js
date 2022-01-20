import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const getIndexById = (id, arr) => {
  return arr.map((entry) => entry.id).indexOf(id);
};

export const LinkButton = function (props) {
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

export const snackbarDispatcher = (actions, invokeSnackbar) => {
  actions.forEach(([message, variant]) =>
    invokeSnackbar(message, { variant: variant })
  );
};
