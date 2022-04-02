import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Deck from "./Deck/Deck";
import {
  deleteDeck,
  exportDeckTxt,
  getDecksAndIDs,
} from "../../utilities/ankiAPI";
import { useEffect, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSnackbar } from "notistack";
import styles from "./styles";

export default function DecksView(props) {
  const [decks, setDecks] = useState(null);
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar } = useSnackbar();

  const loadDecks = async () => {
    const response = await getDecksAndIDs();
    if (!response) setStatus("failed");
    if (response) {
      setDecks(response);
      setStatus("loaded");
    }
  };
  useEffect(() => {
    if (!decks) {
      loadDecks();
    }
  }, [decks]);
  if (status === "loading") {
    return (
      <Container maxWidth="md" sx={styles.mainContainer}>
        <CircularProgress></CircularProgress>
      </Container>
    );
  }
  if (status === "failed") {
    return (
      <Container maxWidth="md" sx={styles.mainContainer}>
        <Box sx={styles.errorIcon}>
          <ErrorOutlineIcon fontSize="large"></ErrorOutlineIcon>
        </Box>
        <Typography align="center" variant="h5" gutterBottom>
          App could not connect with Anki API
        </Typography>
        <Typography align="center" variant="h6" gutterBottom>
          Learn more on how to connect your Anki application by following the
          link below
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
  if (status === "loaded") {
    return (
      <Container maxWidth="md" sx={styles.mainContainer}>
        <Grid container spacing={2} direction="row" justifyContent="center">
          {Object.entries(decks).map(([key, value]) => (
            <Grid item xs={"auto"} key={key}>
              <Deck
                key={key}
                id={key}
                name={value}
                handleDelete={deleteDeck}
                handleExport={exportDeckTxt}
              ></Deck>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
