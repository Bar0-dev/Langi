import { useState, useEffect } from "react";

export const snackbarDispatcher = (actions, invokeSnackbar) => {
  actions.forEach(([message, variant]) =>
    invokeSnackbar(message, { variant: variant })
  );
};

export const setCache = (key, value, expiryDays = 99999) => {
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
  pictureFront = "",
  pictureBack = "",
  audio = [],
  video = [],
  tags = [],
}) => {
  const card = new Map();
  card.set("deckName", deckName);
  card.set("front", front);
  card.set("back", back);
  card.set("suggestions", suggestions);
  card.set("pictureFront", pictureFront);
  card.set("pictureBack", pictureBack);
  card.set("tags", tags);
  card.set("audio", audio);
  card.set("video", video);

  return card;
};

export const useMap = (initMap = cardTemplate()) => {
  const [myMap, setMyMap] = useState(new Map(initMap));

  const setValue = (key, value) => {
    setMyMap(new Map(myMap).set(key, value));
  };

  return [myMap, setValue, setMyMap];
};

export const useMediaQuery = (query) => {
  const mediaQuery = window.matchMedia(query);
  const [matching, setMatching] = useState(mediaQuery.matches);
  const handleResize = () => {
    setMatching(mediaQuery.matches);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mediaQuery.matches, handleResize]);

  return matching;
};

export const breakPoints = {
  mobile: "(max-width: 600px)",
  tablet: "(max-width: 1200px)",
};
