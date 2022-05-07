import {
  Box,
  Card,
  Chip,
  Grow,
  IconButton,
  Link,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";

const ResultViewer = (props) => {
  return (
    <Box sx={styles.results}>
      <Box sx={styles.suggestions}>
        <Typography variant="body">Suggestions: </Typography>

        {props.suggestions.length > 0
          ? props.suggestions.map((value) => (
              <Grow key={value} in={true} style={{ timeout: 1000 }}>
                <Chip
                  key={value}
                  label={value}
                  onClick={props.handleTrgtTxtChange}
                ></Chip>
              </Grow>
            ))
          : "nothing found"}
      </Box>
      <Box sx={styles.image}>
        <Typography>Image:</Typography>
        {props.imgUrl ? <Link href={props.imgUrl}>open</Link> : "nothing found"}
      </Box>
    </Box>
  );
};

let inputTimer = null;
const Flashcard = function (props) {
  const card = new Map();
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);
  const [suggestions, setSuggestions] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const settings = props.settings;

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
    if (inputTimer) {
      window.clearTimeout(inputTimer);
      inputTimer = "null ";
    }
    if (!isEmpty(props.dict)) {
      if (inputText)
        inputTimer = setTimeout(async () => {
          if (settings.suggestions) {
            const sugRes = await props.dict.getTranslations(inputText);
            if (sugRes) {
              setSuggestions(sugRes);
            }
          }
          if (settings.addImg) {
            const [imgurl] = await props.dict.getImageUrls(
              inputText,
              "thumbnail",
              300
            );
            setImgUrl(imgurl);
            props.handleChange({
              id: props.id,
              sourceText: inputText,
              pictureData: {
                url: imgurl,
                filename: `${inputText}.jpg`,
                fields: ["Back"],
              },
            });
          }
        }, 3000);
    }
  };

  return (
    <Zoom in={true}>
      <Card key={props.id} sx={styles.card}>
        <Box style={styles.inputs}>
          <TextField
            value={sourceText}
            onChange={handleSrcTxtChange}
          ></TextField>
          <ArrowForwardIosIcon />
          <TextField
            value={targetText}
            onChange={handleTrgtTxtChange}
          ></TextField>
          <IconButton
            onClick={() => {
              props.handleDeleteCard(props.id);
            }}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        {settings.suggestions || settings.addImg ? (
          <ResultViewer
            suggestions={suggestions}
            imgUrl={imgUrl}
            handleTrgtTxtChange={handleTrgtTxtChange}
          ></ResultViewer>
        ) : null}
      </Card>
    </Zoom>
  );
};
export default Flashcard;
