import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModeSwitch from "./ModeSwitch/ModeSwitch";
import LinkButton from "../common/LinkButton";
import StyleIcon from "@mui/icons-material/Style";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: (theme) => theme.spacing(2) }}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: (theme) => theme.spacing(1),
            }}
          >
            <StyleIcon fontSize="large"></StyleIcon>
            <Typography align="center" variant="h4" component="span">
              Langi
            </Typography>
          </Link>

          {Object.entries(props.links).map(([key, link]) => (
            <LinkButton key={key} to={link} color="inherit">
              {key}
            </LinkButton>
          ))}
          <Box sx={{ flexGrow: 1 }}></Box>
          <ModeSwitch checked={props.darkIsOn} onChange={props.toggleMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
