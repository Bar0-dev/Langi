import {
  Box,
  Card,
  Chip,
  Collapse,
  Grow,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import {
  useMap,
  useMediaQuery,
  breakPoints,
} from "../../../utilities/utilities";

const ResultViewer = (props) => {
  return (
    <Box sx={styles.results}>
      <Collapse in={props.suggestions.length ? true : false}>
        <Box sx={styles.suggestions}>
          <Typography variant="body">Suggestions: </Typography>
          {props.suggestions.map((value) => (
            <Grow key={value} in={true} style={{ timeout: 1000 }}>
              <Chip
                key={value}
                id={value}
                label={value}
                onClick={props.handleChange}
              ></Chip>
            </Grow>
          ))}
        </Box>
      </Collapse>
      <Collapse in={props.imgUrlFront ? true : false}>
        <Box sx={styles.image}>
          <Typography>Image Front:</Typography>
          <Link target="_blank" rel="noreferrer" href={props.imgUrlFront}>
            open
          </Link>
        </Box>
      </Collapse>
      <Collapse in={props.imgUrlBack ? true : false}>
        <Box sx={styles.image}>
          <Typography>Image Back:</Typography>
          <Link target="_blank" rel="noreferrer" href={props.imgUrlBack}>
            open
          </Link>
        </Box>
      </Collapse>
    </Box>
  );
};

const Flashcard = function (props) {
  const mobileQuery = useMediaQuery(breakPoints.mobile);

  const [card, setCardValue, setCard] = useMap(props.data);
  const translateButtonRef = useRef();
  const settings = props.settings;

  const handleFrontChange = (e) => {
    setCardValue("front", e.target.value);
  };

  const handleBackChange = (e) => {
    setCardValue("back", e.target.value);
  };

  const handleChipClick = (e) => {
    setCardValue("back", e.currentTarget.innerText);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      translateButtonRef.current.focus();
      translateButtonRef.current.click();
      setTimeout(() => translateButtonRef.current.blur(), 300);
    }
    return false;
  };

  const handleTranslateRequest = () => {
    return emmitRequest(card.get("front"));
  };

  const emmitRequest = async (inputText) => {
    if (isEmpty(props.dict)) return;
    if (!inputText) return;
    const newCard = new Map(card);
    if (settings.suggestions) {
      const sugRes = await props.dict.getTranslations(inputText);
      if (sugRes) {
        newCard.set("suggestions", sugRes);
      }
    }
    if (settings.addImageBack || settings.addImageFront) {
      const imgData = await props.dict.getImageUrls(
        inputText,
        "thumbnail",
        200
      );
      if (imgData) {
        const [imgurl] = imgData;
        if (settings.addImageBack) newCard.set("pictureBack", imgurl);
        if (settings.addImageFront) newCard.set("pictureFront", imgurl);
      }
    }
    setCard(newCard);
  };

  useEffect(() => {
    props.handleChange(props.id, card);
  }, [card]);

  return (
    <Paper key={props.id} sx={styles.flashcard}>
      <Box
        style={
          mobileQuery
            ? { ...styles.inputs, ...styles.inputsMobile }
            : styles.inputs
        }
      >
        <IconButton ref={translateButtonRef} onClick={handleTranslateRequest}>
          <TranslateIcon></TranslateIcon>
        </IconButton>
        <TextField
          value={card.get("front")}
          onChange={handleFrontChange}
          onKeyDown={handleKeyPress}
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
      <ResultViewer
        suggestions={card.get("suggestions")}
        imgUrlBack={
          card.get("pictureBack").length ? card.get("pictureBack") : null
        }
        imgUrlFront={
          card.get("pictureFront").length ? card.get("pictureFront") : null
        }
        handleChange={handleChipClick}
      ></ResultViewer>
    </Paper>
  );
};
export default Flashcard;
