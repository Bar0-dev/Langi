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
