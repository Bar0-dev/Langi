import { ListItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Flashcard from "./Flashcard/Flashcard";
import {
  addCards,
  deleteCards,
  updateCard,
  getCards,
  createDeck,
} from "../../utilities/ankiAPI";
import { cardTemplate, snackbarDispatcher } from "../../utilities/utilities";
import _ from "lodash";

let deckIsChanged = false;

export const resetChangeFlag = () => (deckIsChanged = false);

export const cardReactElements = (cards, setCards, dict, settings) => {
  console.log(cards);
  const elements = [];
  cards.forEach((value, key) => {
    elements.push(
      <ListItem key={key}>
        <Flashcard
          id={key}
          data={value}
          handleChange={handleChange(cards, setCards)}
          handleDeleteCard={handleDeleteCard(cards, setCards)}
          dict={dict}
          settings={settings}
        />
      </ListItem>
    );
  });
  return elements;
};

export const handleAddCard = (deckName, cards, setCards) => () => {
  const cardsNew = new Map(cards);
  cardsNew.set(uuidv4(), cardTemplate({ deckName: deckName }));
  setCards(cardsNew);
  deckIsChanged = true;
};

const handleDeleteCard = (cards, setCards) => (cardId) => {
  const cardsNew = new Map(cards);
  cardsNew.delete(cardId);
  setCards(cardsNew);
  deckIsChanged = true;
};

const handleChange = (cards, setCards) => (id, data) => {
  const cardsNew = new Map(cards);
  cardsNew.set(id, data);
  setCards(cardsNew);
  deckIsChanged = true;
};

const handleSaveRemove = async (cardsInAnki, cards) => {
  try {
    const cardsToRemove = [...cardsInAnki]
      .filter(([key, value]) => !cards.has(key))
      .map(([key, value]) => key);
    if (cardsToRemove.length) {
      await deleteCards(cardsToRemove);
      return cardsToRemove;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const handleSaveChange = async (cardsInAnki, cards) => {
  try {
    const cardsChanged = [...cards]
      .filter(([key]) => cardsInAnki.has(key)) //take only already existing cards
      .filter(
        ([key, value]) =>
          value.get("front") !== cardsInAnki.get(key).get("front") ||
          value.get("back") !== cardsInAnki.get(key).get("back")
      );
    if (cardsChanged.length) {
      cardsChanged.forEach((card) => updateCard(card));
      return cardsChanged;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const handleSaveNew = async (cardsInAnki, cards, setCards) => {
  const updateIDs = (newKeys, response, cards, setCards) => {
    const cardsNewIds = new Map(cards);
    newKeys.forEach((key, index) => {
      const value = cardsNewIds.get(key);
      cardsNewIds.delete(key);
      cardsNewIds.set(response[index], value);
    });
    setCards(cardsNewIds);
  };
  try {
    const cardsMerged = new Map([...cards, ...cardsInAnki]);
    const newKeys = [];
    const cardsNew = [...cardsMerged].filter(([key]) => !cardsInAnki.has(key));
    cardsNew.forEach(([key]) => newKeys.push(key));
    if (cardsNew.length) {
      const response = await addCards(cardsNew);
      if (response[0] !== null) {
        updateIDs(newKeys, response, cards, setCards);
      } else {
        return false;
      }
      return response;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const handleSaveExistingDeck = async (deckId, cards, setCards) => {
  try {
    const actions = [];
    const cardsInAnki = await getCards(deckId);
    //deleting removed cards from anki
    const removeResult = await handleSaveRemove(cardsInAnki, cards);
    if (removeResult) {
      actions.push([
        `Removed ${removeResult.length} ${
          removeResult.length > 1 ? "cards" : "card"
        }`,
        "info",
      ]);
    }

    //saving changes on existing cards
    const changeResult = await handleSaveChange(cardsInAnki, cards);
    if (changeResult) {
      actions.push([
        `Changed ${changeResult.length} ${
          changeResult.length > 1 ? "cards" : "card"
        }`,
        "info",
      ]);
    }

    //saving new cards
    const newCardsResult = await handleSaveNew(cardsInAnki, cards, setCards);
    if (newCardsResult) {
      actions.push([
        `Added ${newCardsResult.length} ${
          newCardsResult.length > 1 ? "cards" : "card"
        }`,
        "success",
      ]);
    }
    return actions;
  } catch (error) {
    console.log(error);
  }
};

const handleSaveNewDeck = async (deckName, cards, setCards, navigate) => {
  try {
    const actions = [];
    const newDeckId = await createDeck(deckName);
    if (newDeckId) {
      //saving new cards
      const newCardsResult = await handleSaveNew(new Map(), cards, setCards);
      if (newCardsResult) {
        actions.push([
          `Added ${newCardsResult.length} ${
            newCardsResult.length > 1 ? "cards" : "card"
          }`,
          "success",
        ]);
      }
      actions.push(["Deck created"]);
      navigate(`/edit/${newDeckId}`, { replace: true });
    }
    if (deckName === "") actions.push(["Deck name can not be empty", "error"]);
    if (deckName && !newDeckId) {
      actions.push(["Can not save if the Anki app is not connected", "error"]);
    }
    return actions;
  } catch (error) {
    console.log(error);
  }
};

export const handleSave =
  (deckId, deckName, cards, setCards, enqueueSnackbar, navigate) =>
  async () => {
    let allActions = [];
    if (deckId === "newDeck") {
      const actions = await handleSaveNewDeck(
        deckName,
        cards,
        setCards,
        navigate
      );
      allActions.push(...actions);
    } else {
      const actions = await handleSaveExistingDeck(deckId, cards, setCards);
      allActions.push(...actions);
    }

    //notifications snackbars
    if (!allActions.length)
      snackbarDispatcher([["Nothing was saved", "warning"]], enqueueSnackbar);
    snackbarDispatcher(allActions, enqueueSnackbar);
    allActions = [];
    deckIsChanged = false;
  };

export const handleClose =
  (setDialogOpen, setContent, setData, navigate) => async () => {
    if (deckIsChanged) {
      setContent({
        title: "Confirm action",
        message: "Do you want to discard unsaved items?",
        button1: "Yes",
        button2: "No",
      });
      setData({ action: "navigate", payload: "./decks" });
      setDialogOpen(true);
    } else {
      navigate("../decks");
    }
  };

export const handleSetName = (setName, deckId) => (event) => {
  if (deckId === "newDeck") setName(event.target.value);
};
