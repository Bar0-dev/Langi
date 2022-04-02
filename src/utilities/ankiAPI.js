import axios from "axios";

const ankiAPI = async (action, params) => {
  const response = await axios
    .post(
      "http://127.0.0.1:8765",
      JSON.stringify({ action: action, version: 6, params: params })
    )
    .then((response) => {
      return response.data.result;
    });
  return response;
};

const noteTemplate = (data) => {
  const [
    id,
    {
      deckName,
      sourceText,
      targetText,
      options,
      pictureData,
      audioData,
      videoData,
      tags, //array
    },
  ] = data;

  return {
    deckName: deckName,
    modelName: "Basic",
    fields: {
      Front: sourceText,
      Back: targetText,
    },
    options: {
      allowDuplicate: true,
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

export const getDeckNameByID = async (deckId) => {
  try {
    const decks = await getDecksAndIDs();
    if (Object.keys(decks).includes(deckId)) {
      return decks[deckId];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteDeck = async (deckId) => {
  try {
    if (!deckId) throw new Error("Provide the deckId");
    const deckName = await getDeckNameByID(deckId);
    if (!deckName) throw new Error("Deck by this id does not exist");
    const response = await ankiAPI("deleteDecks", {
      decks: [deckName],
      cardsToo: true,
    });
    if (!response) throw new Error("Deck deletion was unsuccessful");
    return response;
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

export const getCardsInfo = async (IDarr) => {
  try {
    const data = await ankiAPI("notesInfo", { notes: IDarr });
    return data;
  } catch (error) {}
};

export const addCards = async (cardsData) => {
  try {
    if (!cardsData) throw new Error("Provide cardsData array");
    const response = await ankiAPI("addNotes", {
      notes: cardsData.map((data) => noteTemplate(data)),
    });
    if (!response) throw new Error("Adding cards action was unsuccessful");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCards = async (IDs) => {
  try {
    await ankiAPI("deleteNotes", { notes: IDs });
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (data) => {
  try {
    const [
      id,
      { deckName, sourceText, targetText, audioData, videoData, pictureData },
    ] = data;
    const response = await ankiAPI("updateNoteFields", {
      note: {
        id: id,
        fields: {
          Front: sourceText,
          Back: targetText,
        },
        audio: [audioData],
        video: [videoData],
        picture: [pictureData],
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Using ankiConnect API it is only possible to search for a deck by name
export const getCards = async (deckId) => {
  try {
    const deckName = await getDeckNameByID(deckId);
    if (deckName) {
      const cardIds = await ankiAPI("findNotes", {
        query: `deck:"${deckName}"`,
      });
      const cards = await getCardsInfo(cardIds);
      const cardsParsed = new Map();
      cards.forEach((card) =>
        cardsParsed.set(card.noteId, {
          deckName: deckName,
          sourceText: card.fields.Front.value,
          targetText: card.fields.Back.value,
        })
      );
      return cardsParsed;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createDeck = async (deckName) => {
  try {
    if (!deckName) throw new Error("Provide a deck name");
    const deckId = await ankiAPI("createDeck", { deck: deckName });
    if (!deckId) throw new Error("Deck creation unsuccessful");
    return deckId;
  } catch (error) {
    console.log(error);
  }
};

export const importDeckApkg = async (path) => {
  try {
    if (!path) throw new Error("Invalid parameters in importDeckApkg function");
    const response = await ankiAPI("importPackage", { path: path });
    if (!response) throw new Error("Import was unsuccessful");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const exportDeckApkg = async (deckName, path) => {
  try {
    if (!path || !deckName)
      throw new Error("Invalid parameters in exportDeckApkg function");
    const response = await ankiAPI("exportPackage", {
      deck: deckName,
      path: path + `/${deckName}.apkg`,
      includeSched: true,
    });
    if (!response) throw new Error("Export was unsuccessful");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const importDeckTxt = async (fileData, name) => {
  const dataArr = fileData.split("\n");
  const dataMap = new Map();
  const parsedData = dataArr.map((entry) => entry.replaceAll(/\\t&/g, ""));
  parsedData.forEach((entry, index) => {
    const [srcTxt, trgtTxt] = entry.split("\t");
    dataMap.set(index, {
      deckName: name,
      sourceText: srcTxt,
      targetText: trgtTxt,
    });
  });
  console.log([...dataMap]);
  const deckId = await createDeck(name);
  const response = await addCards([...dataMap]);
  console.log(response);
};

export const exportDeckTxt = async (deckName) => {};
