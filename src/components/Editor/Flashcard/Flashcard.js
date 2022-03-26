import { Card, Chip, Grow, IconButton, TextField, Zoom } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import getTranslations from "wiktionary-translations";
import ISO6391 from "iso-639-1";

//Translate API

let lastInputTimer = null;
const Flashcard = function (props) {
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);
  const [suggestions, setSuggestions] = useState([]);
  const { srcLang, trgtLang } = props.languages;

  const handleSrcTxtChange = (e) => {
    setSourceText(e.target.value);
    props.handleChange({
      id: props.id,
      sourceText: e.target.value,
    });
    emmitRequest(e.target.value);
  };

  const handleTrgtTxtChange = (e) => {
    const value = e.target.value ? e.target.value : e.target.textContent;
    setTargetText(value);
    props.handleChange({
      id: props.id,
      targetText: value,
    });
  };

  const emmitRequest = (inputText) => {
    if (lastInputTimer) {
      window.clearTimeout(lastInputTimer);
      lastInputTimer = "null ";
    }
    if (inputText && srcLang && trgtLang)
      lastInputTimer = setTimeout(async () => {
        const response = await getTranslations(
          inputText,
          ISO6391.getCode(srcLang),
          ISO6391.getCode(trgtLang)
        );
        if (response) {
          setSuggestions(response);
        }
      }, 3000);
  };

  return (
    <Zoom in={true}>
      <Card key={props.id} sx={styles.card}>
        <TextField value={sourceText} onChange={handleSrcTxtChange}></TextField>
        <ArrowForwardIosIcon />
        <TextField
          value={targetText}
          onChange={handleTrgtTxtChange}
        ></TextField>
        {suggestions.map((value) => (
          <Grow key={value} in={true} style={{ timeout: 1000 }}>
            <Chip
              key={value}
              label={value}
              onClick={handleTrgtTxtChange}
            ></Chip>
          </Grow>
        ))}

        <IconButton
          onClick={() => {
            props.handleDeleteCard(props.id);
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </Card>
    </Zoom>
  );
};
export default Flashcard;
