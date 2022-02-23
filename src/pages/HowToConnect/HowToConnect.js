import { Button, Container, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import styles from "./styles";

export default function HowToConnect(props) {
  return (
    <Container maxWidth="md" sx={styles.mainContainer}>
      <Box sx={styles.centeringBox}>
        <LightbulbIcon sx={styles.icon} fontSize="large"></LightbulbIcon>
      </Box>

      <Typography align="center" variant="h5" gutterBottom>
        How to connect
      </Typography>

      <Typography align="center" variant="h6">
        Langi utilizes AnkiConnect Add-on for the desktop Anki application.
        Install the addon by followig the official AnkiConnect page.
      </Typography>
      <Box sx={styles.centeringBox}>
        <Button
          variant="outlined"
          href="https://ankiweb.net/shared/info/2055492159"
        >
          AnkiConnect addon
        </Button>
      </Box>
      <Typography align="center" variant="h6">
        To complete the installation edit the Add-on config as following
      </Typography>
    </Container>
  );
}
