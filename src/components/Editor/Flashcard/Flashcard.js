import { Card, Chip, IconButton, TextField, Zoom } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getVersion, translateText } from "../../../utilities/translateAPI";
import { useState } from "react";

//Translate API

let lastInputTimer = null;
const Flashcard = function (props) {
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);
  const [suggestions, setSuggestions] = useState([]);

  const handleSrcTxtChange = (e) => {
    setSourceText(e.target.value);
    props.handleChange({
      id: props.id,
      sourceText: e.target.value,
    });
    emmitRequest(e.target.value);
  };

  const handleTrgtTxtChange = (e) => {
    setTargetText(e.target.value);
    props.handleChange({
      id: props.id,
      targetText: e.target.value,
    });
  };

  const emmitRequest = (inputText) => {
    if (lastInputTimer) {
      window.clearTimeout(lastInputTimer);
      lastInputTimer = "null ";
    }
    if (inputText)
      lastInputTimer = setTimeout(() => {
        translate(inputText, "en", "pl");
      }, 3000);
  };

  const translate = async (inputText, srcLang, trgtLang) => {
    const response = await translateText(inputText, srcLang, trgtLang);
    setSuggestions([...response]);
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
          <Chip key={value} label={value.output} onClick={() => {}}></Chip>
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
