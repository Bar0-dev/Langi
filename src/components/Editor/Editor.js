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
import { addCards, deleteCard, getCards, getDecksAndIDs } from "../../ankiAPI";

const Editor = function (props) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState({});
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

  const handleAddCard = async () => {
    try {
      const cardsNew = [
        ...cards,
        { id: "New" + uuidv4(), sourceText: "", targetText: "" },
      ];
      setCards(cardsNew);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      const cardsNew = cards.filter((card) => card.id !== cardId);
      setCards(cardsNew);
    } catch (error) {
      console.log(error);
    }
  };

  const getCardsData = (data) => {
    console.log(data);
  };

  const handleSave = async () => {
    try {
      const cardsInAnki = await getCards(deckId);
      console.log(cards);
      console.log(cardsInAnki);
      const cardsToAdd = cards.filter((card) =>
        String(card.id).includes("New")
      );
      const result = await addCards(cardsToAdd);
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
      <List>
        {Object.values(cards).map((entry) => (
          <ListItem key={entry.id}>
            <Flashcard
              data={entry}
              removeSelf={handleDeleteCard}
              getCardsData={getCardsData}
            />
          </ListItem>
        ))}
      </List>
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
