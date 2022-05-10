import axios from "axios";
import { saveAs } from "file-saver";
import { cardTemplate } from "./utilities";

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

const frontTemplate = (text) =>
  `<span id="front-text" style="font-size: 40px;">${text}</span>`;
const backTemplate = (text) =>
  `<span id="back-text" style="font-size: 40px;">${text}</span><br>`;

const noteTemplate = (data) => {
  const [id, card] = data;

  return {
    deckName: card.get("deckName"),
    modelName: "Basic",
    fields: {
      Front: frontTemplate(card.get("front")),
      Back: backTemplate(card.get("back")),
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
    tags: card.get("tags"),
    audio: card.get("audio"),
    video: card.get("video"),
    picture: card.get("picture"),
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
    const [id, cardData] = data;
    const response = await ankiAPI("updateNoteFields", {
      note: {
        id: id,
        fields: {
          Front: frontTemplate(cardData.get("front")),
          Back: backTemplate(cardData.get("back")),
        },
        audio: cardData.get("audio"),
        video: cardData.get("video"),
        picture: cardData.get("picture"),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const parseCardsContent = (cards, deckName) => {
  const htmlParser = new DOMParser();
  const cardsMap = new Map();
  cards.forEach((card) => {
    const frontElements = htmlParser.parseFromString(
      card.fields.Front.value,
      "text/html"
    ).body.childNodes;
    const [front] = [...frontElements].filter(
      (element) => element.id === "front-text"
    );
    const backElements = htmlParser.parseFromString(
      card.fields.Back.value,
      "text/html"
    ).body.childNodes;
    const [back] = [...backElements].filter(
      (element) => element.id === "back-text"
    );

    cardsMap.set(
      card.noteId,
      cardTemplate({
        deckName: deckName,
        front: front.textContent,
        back: back.textContent,
        tags: card.tags,
      })
    );
  });
  return cardsMap;
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
      const cardsParsed = parseCardsContent(cards, deckName);
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

export const exportDeckTxt = async (deckId) => {
  const cards = await getCards(deckId);
  const name = await getDeckNameByID(deckId);
  const cardsParsed = [...cards].map(
    ([id, { deckName, sourceText, targetText }]) => {
      return `${sourceText}\t${targetText}`;
    }
  );
  const cardsString = cardsParsed.join(" \n");
  const blob = new Blob([cardsString], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${name}.txt`);
};

//Models

export const createImageModel = async () => {
  const model = {
    modelName: "BasicImage",
    inOrderFields: ["Field1", "Field2", "Field3"],
    cardTemplates: [
      {
        Front: "Front html {{Field1}}",
        Back: "<div><span>{{Field2}}</span><img/></div>",
      },
    ],
  };
};
