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
import { snackbarDispatcher } from "../../utilities/utilities";

let deckIsChanged = false;

export const resetChangeFlag = () => (deckIsChanged = false);

export const cardReactElements = (cards, setCards, { srcLang, trgtLang }) => {
  const elements = [];
  cards.forEach((value, key) => {
    elements.push(
      <ListItem key={key}>
        <Flashcard
          id={key}
          data={value}
          handleChange={handleChange(cards, setCards)}
          handleDeleteCard={handleDeleteCard(cards, setCards)}
          languages={{ srcLang, trgtLang }}
        />
      </ListItem>
    );
  });
  return elements;
};

export const handleAddCard = (deckName, cards, setCards) => () => {
  const cardsNew = new Map(cards);
  cardsNew.set(uuidv4(), {
    deckName: deckName,
    sourceText: "",
    targetText: "",
  });
  setCards(cardsNew);
  deckIsChanged = true;
};

const handleDeleteCard = (cards, setCards) => (cardId) => {
  const cardsNew = new Map(cards);
  cardsNew.delete(cardId);
  setCards(cardsNew);
  deckIsChanged = true;
};

const handleChange = (cards, setCards) => (data) => {
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
      .filter(([key, value]) => cardsInAnki.has(key)) //take only already existing cards
      .filter(
        ([key, value]) =>
          JSON.stringify(value) !== JSON.stringify(cardsInAnki.get(key))
      ); //compare stringified objects to detect any changes
    if (cardsChanged.length) {
      await cardsChanged.forEach((card) => updateCard(card));
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
    const cardsNew = [...cardsMerged].filter(
      ([key, value]) => !cardsInAnki.has(key)
    );
    cardsNew.forEach(([key, value]) => newKeys.push(key));
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

export const handleSave =
  (deckId, deckName, cards, setCards, enqueueSnackbar, navigate) =>
  async () => {
    try {
      let actions = [];
      if (deckId !== "newDeck") {
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
        const newCardsResult = await handleSaveNew(
          cardsInAnki,
          cards,
          setCards
        );
        if (newCardsResult) {
          actions.push([
            `Added ${newCardsResult.length} ${
              newCardsResult.length > 1 ? "cards" : "card"
            }`,
            "success",
          ]);
        }
      } else {
        const newDeckId = await createDeck(deckName);
        if (newDeckId) {
          //saving new cards
          const newCardsResult = await handleSaveNew(
            new Map(),
            cards,
            setCards
          );
          if (newCardsResult) {
            actions.push([
              `Added ${newCardsResult.length} ${
                newCardsResult.length > 1 ? "cards" : "card"
              }`,
              "success",
            ]);
          }
          actions.push(["Deck created"]);
          navigate(`./${newDeckId}`, { replace: true });
        }
        if (deckName === "")
          actions.push(["Deck name can not be empty", "error"]);
        if (deckName && !newDeckId) {
          actions.push([
            "Can not save if the Anki app is not connected",
            "error",
          ]);
        }
      }

      //notifications snackbars
      if (!actions.length)
        snackbarDispatcher([["Nothing was saved", "warning"]], enqueueSnackbar);
      snackbarDispatcher(actions, enqueueSnackbar);
      actions = [];
      deckIsChanged = false;
    } catch (error) {
      console.log(error);
    }
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

export const handleSetName = (setName, status) => (event) => {
  if (status === "newDeck") setName(event.target.value);
};
