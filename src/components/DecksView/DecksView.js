import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import Deck from "./Deck/Deck";
import {
  deleteDeck,
  exportDeckTxt,
  getDecksAndIDs,
} from "../../utilities/ankiAPI";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSnackbar } from "notistack";
import styles from "./styles";
import InLoading from "../common/InLoading/InLoading";
import DecksLoadFailed from "../DecksLoadFailed/DecksLoadFailed";
import CommonContainer from "../common/CommonContainer/CommonContainer";

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
    return <InLoading />;
  }
  if (status === "failed") {
    return <DecksLoadFailed></DecksLoadFailed>;
  }
  if (status === "loaded") {
    return (
      <CommonContainer sx={styles.mainContainer}>
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
        <Box sx={styles.buttonWrapper}>
          <IconButton component={Link} to="/newDeck">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </CommonContainer>
    );
  }
}
