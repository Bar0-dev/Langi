import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StyleIcon from "@mui/icons-material/Style";
import ModeSwitch from "./ModeSwitch/ModeSwitch";
import LinkButton from "../common/LinkButton";
import logo from "../../logo/logo.png";
import { Link } from "@mui/material";

export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: (theme) => theme.spacing(2) }}>
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ display: "flex", gap: (theme) => theme.spacing(1) }}
          >
            <img src={logo} style={{ height: "40px" }}></img>
            <Typography align="center" variant="h4" component="span">
              Langi
            </Typography>
          </Link>

          {Object.entries(props.links).map(([key, link]) => (
            <LinkButton key={key} link={link} text={key} />
          ))}
          <Box sx={{ flexGrow: 1 }}></Box>
          <ModeSwitch checked={props.darkIsOn} onChange={props.toggleMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
