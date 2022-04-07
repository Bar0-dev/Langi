import { Card, Chip, Grow, IconButton, TextField, Zoom } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import ISO6391 from "iso-639-1";
import WiktTransl from "wiktionary-translations";

//Translate API

let lastInputTimer = null;
const Flashcard = function (props) {
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);
  const [suggestions, setSuggestions] = useState([]);
  const [srcLang, setSrcLang] = useState(props.languages.srcLang);
  const [trgtLang, setTrgtLang] = useState(props.languages.trgtLang);
  const [WikiDict, setWikiDict] = useState({});

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
        const response = await WiktTransl.getTranslations(inputText);
        if (response) {
          setSuggestions(response);
        }
      }, 3000);
  };
  useEffect(() => {
    setSrcLang(props.languages.srcLang);
    setTrgtLang(props.languages.trgtLang);
    console.log(srcLang);
    if (srcLang && trgtLang) {
      setWikiDict(
        new WiktTransl(ISO6391.getCode(srcLang), ISO6391.getCode(trgtLang))
      );
    }
  }, [srcLang, trgtLang, setWikiDict]);

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
