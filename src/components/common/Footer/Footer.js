import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./styles";

export default function Footer(props) {
  return (
    <Paper sx={styles.mainContainer}>
      <Box>
        <IconButton>
          <LinkedInIcon />
        </IconButton>
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </Box>
      <Box sx={styles.copyright}>
        <Typography>© {new Date().getFullYear()} Bartosz Pietrzak</Typography>
      </Box>
    </Paper>
  );
}
