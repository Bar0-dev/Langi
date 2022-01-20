import { IconButton, Paper, FormControl, Button, List } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Link } from "react-router-dom";
import {
  handleAddCard,
  cardReactElements,
  handleSave,
} from "./editorController";
import { useSnackbar } from "notistack";
import { getCards, getDecksAndIDs } from "../../ankiAPI";

let completedActions = [];

const Editor = function (props) {
  const [deckName, setName] = useState("");
  const [cards, setCards] = useState(new Map());
  const { enqueueSnackbar } = useSnackbar();
  const deckId = useParams().deckId;

  const loadCards = useCallback(
    async (id) => {
      try {
        const cards = await getCards(id);
        setCards(cards);
        const decks = await getDecksAndIDs();
        const deckName = decks[deckId];
        setName(deckName);
      } catch (error) {
        console.log(error);
      }
    },
    [deckId]
  );

  useEffect(() => {
    loadCards(deckId);
  }, [deckId, loadCards]);

  return (
    <Paper sx={styles.paper}>
      <EditorHeader deckName={deckName}></EditorHeader>
      <List>{cardReactElements(cards, setCards)}</List>
      <IconButton
        sx={styles.iconAdd}
        onClick={handleAddCard(deckName, cards, setCards)}
      >
        <AddCircleIcon fontSize="large"></AddCircleIcon>
      </IconButton>
      <FormControl sx={styles.formControl}>
        <Button
          size="large"
          variant="contained"
          onClick={handleSave(deckId, cards, setCards, enqueueSnackbar)}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          component={Link}
          to="/decks"
          size="large"
          variant="outlined"
          startIcon={<CancelIcon />}
        >
          Close
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Editor;
