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
import { useMap } from "../../../utilities/utilities";

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
  const [card, setCardValue] = useMap(props.data);
  const settings = props.settings;

  const handleFrontChange = (e) => {
    setCardValue("front", e.target.value);
  };

  const handleBackChange = (e) => {
    setCardValue("back", e.target.value);
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
              setCardValue("suggestions", sugRes);
            }
          }
          if (settings.addImg) {
            const [imgurl] = await props.dict.getImageUrls(
              inputText,
              "thumbnail",
              300
            );
            console.log(card);
            setCardValue("picture", { url: imgurl });
          }
        }, 3000);
    }
  };

  useEffect(() => {
    props.handleChange(props.id, card);
    emmitRequest(card.get("front"));
  }, [card]);

  return (
    <Zoom in={true}>
      <Card key={props.id} sx={styles.card}>
        <Box style={styles.inputs}>
          <TextField
            value={card.get("front")}
            onChange={handleFrontChange}
          ></TextField>
          <ArrowForwardIosIcon />
          <TextField
            value={card.get("back")}
            onChange={handleBackChange}
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
            suggestions={card.get("suggestions")}
            imgUrl={card.get("picture").url}
            handleTrgtTxtChange={handleBackChange}
          ></ResultViewer>
        ) : null}
      </Card>
    </Zoom>
  );
};
export default Flashcard;
