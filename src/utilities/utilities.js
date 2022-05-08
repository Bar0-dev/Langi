import { useState } from "react";

export const snackbarDispatcher = (actions, invokeSnackbar) => {
  actions.forEach(([message, variant]) =>
    invokeSnackbar(message, { variant: variant })
  );
};

export const setCache = (key, value, expiryDays) => {
  let expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const item = {
    value: value,
    expiry: expiryDate.getTime(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const cardTemplate = ({
  deckName = "",
  front = "",
  back = "",
  suggestions = [],
  picture = { url: "" },
  tags = [],
}) => {
  const card = new Map();
  card.set("deckName", deckName);
  card.set("front", front);
  card.set("back", back);
  card.set("suggestions", suggestions);
  card.set("picture", picture);
  card.set("tags", tags);

  return card;
};

export const useMap = (initMap = cardTemplate()) => {
  const [myMap, setMyMap] = useState(new Map(initMap));

  const setValue = (key, value) => {
    setMyMap(new Map(myMap).set(key, value));
  };

  return [myMap, setValue];
};
