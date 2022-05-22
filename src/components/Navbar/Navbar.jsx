import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModeSwitch from "./ModeSwitch/ModeSwitch";
import LinkButton from "../common/LinkButton";
import StyleIcon from "@mui/icons-material/Style";
import MenuIcon from "@mui/icons-material/Menu";
import { Collapse, IconButton, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { breakPoints, useMediaQuery } from "../../utilities/utilities";
import { useEffect, useState } from "react";
import styles from "./styles";

const NavBarMobile = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(open ? false : true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ ...styles.appbar, ...styles.appbarMobile }}
      >
        <Box sx={styles.upperBar}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={styles.logo}
          >
            <StyleIcon fontSize="large"></StyleIcon>
            <Typography align="center" variant="h4" component="span">
              Langi
            </Typography>
          </Link>
          <Box sx={styles.buttonWrapper}>
            <IconButton color="inherit" onClick={handleOpen} size="large">
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={open}>
          <Toolbar sx={{ ...styles.toolbar, ...styles.toolbarMobile }}>
            {Object.entries(props.links).map(([key, link]) => (
              <LinkButton key={key} to={link} color="inherit">
                {key}
              </LinkButton>
            ))}
            <ModeSwitch checked={props.darkIsOn} onChange={props.toggleMode} />
          </Toolbar>
        </Collapse>
      </AppBar>
    </Box>
  );
};

const NavBarDesktop = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.appbar}>
        <Toolbar sx={styles.toolbar}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={styles.logo}
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
};

export default function Navbar(props) {
  const mobileQuery = useMediaQuery(breakPoints.mobile);
  return mobileQuery ? (
    <NavBarMobile {...props} />
  ) : (
    <NavBarDesktop {...props} />
  );
}
