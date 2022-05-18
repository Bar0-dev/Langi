import { Masonry } from "@mui/lab";
import { Button, Container, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Header } from "../../components/common/textComps";
import styles from "./styles";

export default function HowToConnect(props) {
  return (
    <Container sx={styles.container}>
      <Box sx={styles.header}>
        <Header>Connect Anki app</Header>
      </Box>
      <Masonry columns={2}></Masonry>
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
