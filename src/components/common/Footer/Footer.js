import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./styles";

export default function Footer(props) {
  return (
    <Paper sx={styles.paper}>
      <Box>
        <IconButton href="https://www.linkedin.com/in/bartoszpietrzak/">
          <LinkedInIcon />
        </IconButton>
        <IconButton href="https://github.com/Bar0-dev">
          <GitHubIcon />
        </IconButton>
      </Box>
      <Box sx={styles.copyright}>
        <Typography>© {new Date().getFullYear()} Bartosz Pietrzak</Typography>
      </Box>
    </Paper>
  );
}
