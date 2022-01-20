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
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditorHeader from "./EditorHeader/EditorHeader";
import SideMenu from "./SideMenu/SideMenu";
import { v4 as uuidv4 } from "uuid";
import {
  addCards,
  deleteCards,
  updateCard,
  getCards,
  getDecksAndIDs,
} from "../../ankiAPI";

const Editor = function (props) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState(new Map());
  const deckId = useParams().deckId;

  const loadCards = async (id) => {
    try {
      const cards = await getCards(id);
      setCards(cards);
      const decks = await getDecksAndIDs();
      const deckName = decks[deckId];
      setName(deckName);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(cardsNew);
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
      await addCards(cardsNew);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCards(deckId);
  }, []);

  return (
    <Paper sx={styles.paper}>
      <SideMenu></SideMenu>
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
        <Button size="large" variant="outlined" startIcon={<CancelIcon />}>
          Discard
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Editor;
