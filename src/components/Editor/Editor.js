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
import {
  addCards,
  deleteCards,
  updateCard,
  getCards,
  getDecksAndIDs,
} from "../../ankiAPI";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

let alertData = { severity: "info", message: "placeholder" };

const Editor = function (props) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState(new Map());
  const [alertOpen, setAlertOpen] = useState(false);

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

  const handleAddCard = async () => {
    try {
      const cardsNew = new Map(cards);
      cardsNew.set(uuidv4(), {
        deckName: name,
        sourceText: "",
        targetText: "",
      });
      setCards(cardsNew);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = (cardId) => {
    try {
      const cardsNew = new Map(cards);
      cardsNew.delete(cardId);
      setCards(cardsNew);
    } catch (error) {
      console.log(error);
    }
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
      await deleteCards(cardsToRemove);
      if (cardsToRemove.length)
        sendAlert(
          "info",
          `Removed ${cardsToRemove.length} ${
            cardsToRemove.length > 1 ? "cards" : "card"
          }`
        );
      //saving changes on existing cards
      const cardsChanged = [...cards]
        .filter(([key, value]) => cardsInAnki.has(key)) //take only already existing cards
        .filter(
          ([key, value]) =>
            JSON.stringify(value) !== JSON.stringify(cardsInAnki.get(key))
        ); //compare stringified objects to detect any changes
      await cardsChanged.forEach((card) => updateCard(card));
      //saving new cards
      const cardsMerged = new Map([...cards, ...cardsInAnki]);
      const cardsNew = [...cardsMerged].filter(
        ([key, value]) => !cardsInAnki.has(key)
      );
      const response = await addCards(cardsNew);
      if (response.length)
        sendAlert(
          "success",
          `Saved ${response.length} ${response.length > 1 ? "cards" : "card"}`
        );
      if (!response.length) sendAlert("info", "No cards were saved");
    } catch (error) {
      console.log(error);
    }
  };

  const sendAlert = (severity, message) => {
    alertData = { severity: severity, message: message };
    setAlertOpen(true);
  };

  useEffect(() => {
    loadCards(deckId);
  }, [deckId, loadCards]);

  return (
    <Paper sx={styles.paper}>
      <EditorHeader deckName={name}></EditorHeader>
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
          Discard
        </Button>
      </FormControl>
      <AlertSnackbar
        open={alertOpen}
        setOpen={setAlertOpen}
        alertData={alertData}
      ></AlertSnackbar>
    </Paper>
  );
};

export default Editor;
