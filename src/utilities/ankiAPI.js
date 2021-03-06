import axios from "axios";
import { saveAs } from "file-saver";
import { cardTemplate, setCache } from "./utilities";
import { v4 as uuidv4 } from "uuid";

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

const imgHtmlTag = (url, side = "back") =>
  `<img style="height: 300px" id="image-${side}" src="${url}">`;

const frontTemplate = (text, pictureUrl = null) =>
  `<span id="front-text" style="font-size: 40px;">${text}</span><br>${
    pictureUrl ? imgHtmlTag(pictureUrl, "front") : ""
  }`;

const backTemplate = (text, pictureUrl = null) =>
  `<span id="back-text" style="font-size: 40px;">${text}</span><br>${
    pictureUrl ? imgHtmlTag(pictureUrl) : ""
  }`;

const noteTemplate = (data) => {
  const [id, card] = data;

  return {
    deckName: card.get("deckName"),
    modelName: "Basic",
    fields: {
      Front: frontTemplate(card.get("front"), card.get("pictureFront")),
      Back: backTemplate(card.get("back"), card.get("pictureBack")),
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
    picture: [],
  };
};

const parseHtmlCardsContent = (cards, deckName) => {
  const getCardElements = (card) => {
    const htmlParser = new DOMParser();
    const htmlFrontElements = htmlParser.parseFromString(
      card.fields?.Front?.value,
      "text/html"
    ).body.childNodes;
    const [front] = [...htmlFrontElements].filter(
      (element) => element.id === "front-text"
    );
    if (!front) return false;
    const [frontImage] = [...htmlFrontElements].filter(
      (element) => element.id === "image-front"
    );
    const htmlBackElements = htmlParser.parseFromString(
      card.fields.Back.value,
      "text/html"
    ).body.childNodes;
    const [back] = [...htmlBackElements].filter(
      (element) => element.id === "back-text"
    );
    const [backImage] = [...htmlBackElements].filter(
      (element) => element.id === "image-back"
    );
    return [front, frontImage, back, backImage];
  };
  const cardsMap = new Map();
  cards.forEach((card) => {
    const cardElements = getCardElements(card);
    if (!cardElements) return false;
    const [front, frontImage, back, backImage] = cardElements;
    cardsMap.set(
      card.noteId ?? uuidv4(),
      cardTemplate({
        deckName: deckName,
        front: front.textContent,
        back: back.textContent,
        tags: card.tags,
        pictureFront: frontImage ? frontImage.src : "",
        pictureBack: backImage ? backImage.src : "",
      })
    );
  });
  if (!cardsMap.length) return false;
  return cardsMap;
};

const parseTextCardContent = (cards, deckName) => {
  if (!cards[0].fields.Front) return false;
  const cardsMap = new Map();
  cards.forEach((card) => {
    const front = card.fields.Front.value;
    const back = card.fields.Back.value;
    if (!front) return false;
    cardsMap.set(
      card.noteId ?? uuidv4(),
      cardTemplate({ deckName: deckName, front: front, back: back })
    );
  });
  return cardsMap;
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

//Using ankiConnect API it is only possible to search for a deck by name
export const getCards = async (deckId, raw = false) => {
  try {
    const deckName = await getDeckNameByID(deckId);
    if (deckName) {
      const cardIds = await ankiAPI("findNotes", {
        query: `deck:"${deckName}"`,
      });
      const cards = await getCardsInfo(cardIds);
      console.log(cards);
      if (raw) return cards;
      const cardsHtmlParsed = parseHtmlCardsContent(cards, deckName);
      if (cardsHtmlParsed) return cardsHtmlParsed;
      const cardsTextParsed = parseTextCardContent(cards, deckName);
      if (cardsTextParsed) return cardsTextParsed;
      return "deckNotSupported";
    } else {
      return "deckNotFound";
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
  const parsedData = dataArr.map((entry) => entry.replaceAll(/\\t&/g, ""));
  //prepare for parsing function
  const cards = parsedData.map((entry, index) => {
    const [srcTxt, trgtTxt] = entry.split("\t");
    return { fields: { Front: { value: srcTxt }, Back: { value: trgtTxt } } };
  });
  const cardsMapFromHtml = parseHtmlCardsContent(cards, name);
  if (cardsMapFromHtml.length) return cardsMapFromHtml;
  const cardsMapFromText = parseTextCardContent(cards, name);
  if (cardsMapFromText) return cardsMapFromText;
  return false;
};

export const exportDeckTxt = async (deckId, deckName, cardsLocal = null) => {
  let cardsParsed = [];
  if (deckId === "newDeck") {
    const cards = [...cardsLocal];
    cardsParsed = cards.map(([, card]) => {
      return `${frontTemplate(
        card.get("front"),
        card.get("pictureFront")
      )}\t${backTemplate(card.get("back"), card.get("pictureBack"))}`;
    });
  } else {
    const cards = await getCards(deckId, true);
    cardsParsed = cards.map((card) => {
      return `${card.fields.Front.value}\t${card.fields.Back.value}`;
    });
  }

  const cardsString = cardsParsed.join(" \n");
  const blob = new Blob([cardsString], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${deckName}.txt`);
};
