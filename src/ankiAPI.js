import axios from "axios";

const ankiAPI = (action, params) => {
  return axios
    .post(
      "http://127.0.0.1:8765",
      JSON.stringify({ action: action, version: 6, params: params })
    )
    .then((response) => {
      return response.data.result;
    });
};

const noteTemplate = (data) => {
  const {
    name,
    sourceText,
    targetText,
    options,
    pictureData,
    audioData,
    videoData,
    tags, //array
  } = data;

  return {
    deckName: name,
    modelName: "Basic",
    fields: {
      Front: sourceText,
      Back: targetText,
    },
    options: {
      allowDuplicate: false,
      duplicateScope: "deck",
      duplicateScopeOptions: {
        deckName: "Default",
        checkChildren: false,
        checkAllModels: false,
      },
    },
    tags: tags,
    audio: [audioData],
    video: [videoData],
    picture: [pictureData],
  };
};

export const getDecksAndIDs = async () => {
  try {
    let decks = await ankiAPI("deckNamesAndIds", {});
    //swapping keys and values
    decks = Object.keys(decks).reduce((ret, key) => {
      ret[decks[key]] = key;
      return ret;
    }, {});
    return decks;
  } catch (error) {
    console.log(error);
  }
};

export const getDeckNameByCardID = async (cardId) => {
  try {
    const response = await ankiAPI("getDecks", { cards: [cardId] });
    const [deckName] = Object.keys(response);
    return deckName;
  } catch (error) {
    console.log(error);
  }
};

export const addCards = async (cardsData) => {
  try {
    const response = await ankiAPI("addNotes", {
      notes: cardsData.map((data) => noteTemplate(data)),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (id) => {
  try {
    await ankiAPI("deleteNotes", { notes: [id] });
  } catch (error) {
    console.log(error);
  }
};

export const getCardsInfo = async (IDarr) => {
  try {
    const data = await ankiAPI("notesInfo", { notes: IDarr });
    return data;
  } catch (error) {}
};

//Using ankiConnect API it is only possible to search for a deck by name
export const getCards = async (deckId) => {
  try {
    const decks = await getDecksAndIDs();
    const deckName = decks[deckId];
    const cardIds = await ankiAPI("findNotes", {
      query: `deck:"${deckName}"`,
    });
    const cards = await getCardsInfo(cardIds);
    const cardsParsed = cards.map((card) => ({
      id: card.noteId,
      sourceText: card.fields.Front.value,
      targetText: card.fields.Back.value,
    }));
    return cardsParsed;
  } catch (error) {
    console.log(error);
  }
};
