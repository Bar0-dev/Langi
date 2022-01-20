import {
  IconButton,
  Paper,
  FormControl,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Flashcard from "./Flashcard/Flashcard";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import EditorHeader from "./EditorHeader/EditorHeader";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import {
  addCards,
  deleteCards,
  updateCard,
  getCards,
  getDecksAndIDs,
} from "../../ankiAPI";
import { snackbarDispatcher } from "../../utilities";

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

  const cardReactElements = (cardsMap) => {
    const elements = [];
    cardsMap.forEach((value, key) => {
      elements.push(
        <ListItem key={key}>
          <Flashcard
            id={key}
            data={value}
            handleChange={handleChange}
            removeSelf={handleDeleteCard}
          />
        </ListItem>
      );
    });
    return elements;
  };

  const handleAddCard = () => {
    const cardsNew = new Map(cards);
    cardsNew.set(uuidv4(), {
      deckName: deckName,
      sourceText: "",
      targetText: "",
    });
    setCards(cardsNew);
  };

  const handleDeleteCard = (cardId) => {
    const cardsNew = new Map(cards);
    cardsNew.delete(cardId);
    setCards(cardsNew);
  };

  const handleChange = (data) => {
    const cardsNew = new Map(cards);
    if (typeof data.sourceText === "string") {
      cardsNew.set(data.id, {
        deckName: cardsNew.get(data.id).deckName,
        sourceText: data.sourceText,
        targetText: cardsNew.get(data.id).targetText,
      });
    }
    if (typeof data.targetText === "string")
      cardsNew.set(data.id, {
        deckName: cardsNew.get(data.id).deckName,
        sourceText: cardsNew.get(data.id).sourceText,
        targetText: data.targetText,
      });
    setCards(cardsNew);
  };

  const handleSave = async () => {
    try {
      const cardsInAnki = await getCards(deckId);
      //deleting removed cards from anki
      const cardsToRemove = [...cardsInAnki]
        .filter(([key, value]) => !cards.has(key))
        .map(([key, value]) => key);
      if (cardsToRemove.length) {
        await deleteCards(cardsToRemove);
        completedActions.push([
          `Removed ${cardsToRemove.length} ${
            cardsToRemove.length > 1 ? "cards" : "card"
          }`,
          "info",
        ]);
      }
      //saving changes on existing cards
      const cardsChanged = [...cards]
        .filter(([key, value]) => cardsInAnki.has(key)) //take only already existing cards
        .filter(
          ([key, value]) =>
            JSON.stringify(value) !== JSON.stringify(cardsInAnki.get(key))
        ); //compare stringified objects to detect any changes
      if (cardsChanged.length) {
        await cardsChanged.forEach((card) => updateCard(card));
        completedActions.push([
          `Changed ${cardsChanged.length} ${
            cardsChanged.length > 1 ? "cards" : "card"
          }`,
          "info",
        ]);
      }
      //saving new cards
      const cardsMerged = new Map([...cards, ...cardsInAnki]);
      const newKeys = [];
      const cardsNew = [...cardsMerged].filter(
        ([key, value]) => !cardsInAnki.has(key)
      );
      cardsNew.forEach(([key, value]) => newKeys.push(key));
      if (cardsNew.length) {
        const response = await addCards(cardsNew);
        if (response[0] !== null) {
          const cardsNewIds = new Map(cards);
          newKeys.forEach((key, index) => {
            const value = cardsNewIds.get(key);
            cardsNewIds.delete(key);
            cardsNewIds.set(response[index], value);
          });
          setCards(cardsNewIds);
          completedActions.push([
            `Added ${cardsNew.length} ${
              cardsNew.length > 1 ? "cards" : "card"
            }`,
            "success",
          ]);
        }
      }
      //notifications snackbars
      if (!completedActions.length)
        snackbarDispatcher([["Nothing was saved", "warning"]], enqueueSnackbar);
      snackbarDispatcher(completedActions, enqueueSnackbar);
      completedActions = [];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCards(deckId);
  }, [deckId, loadCards]);

  return (
    <Paper sx={styles.paper}>
      <EditorHeader deckName={deckName}></EditorHeader>
      <Divider />
      <List>{cardReactElements(cards)}</List>
      <IconButton sx={styles.iconAdd} onClick={handleAddCard}>
        <AddCircleIcon fontSize="large"></AddCircleIcon>
      </IconButton>
      <FormControl sx={styles.formControl}>
        <Button
          size="large"
          variant="contained"
          onClick={handleSave}
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
