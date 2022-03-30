import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";

export default function HowToConnect(props) {
  return (
    <Container maxWidth="md" sx={styles.mainContainer}>
      <Typography align="center" variant="h5" gutterBottom>
        App could not connect with Anki API
      </Typography>
      <Typography align="center" variant="h6" gutterBottom>
        Learn more on how to connect your Anki application by following the link
        below
      </Typography>
      <Box sx={styles.button}>
        <Button href="/howtoconnect" variant="contained">
          How to connect
        </Button>
      </Box>
      <Typography align="center" variant="h6" gutterBottom>
        or create new deck offline and export it later on
      </Typography>
      <Box sx={styles.button}>
        <Button href="../edit/newDeck" variant="outlined">
          New Deck
        </Button>
      </Box>
    </Container>
  );
}
