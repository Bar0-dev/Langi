import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StyleIcon from "@mui/icons-material/Style";
import ModeSwitch from "./ModeSwitch/ModeSwitch";
import LinkButton from "../common/LinkButton";

export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ gap: "20px" }}>
          <StyleIcon edge="start" color="inherit" aria-label="menu" />
          <Typography
            align="center"
            variant="h5"
            component="div"
            sx={{ ml: "-15px" }}
          >
            Langi
          </Typography>
          <LinkButton link={props.links.home} text="Home" />
          <LinkButton link={props.links.newDeck} text="New Deck" />
          <LinkButton link={props.links.decks} text="Local Decks" />
          <LinkButton link={props.links.about} text="About" />
          <Box sx={{ flexGrow: 1 }}></Box>
          <ModeSwitch
            checked={props.darkIsOn}
            onChange={props.toggleMode}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
