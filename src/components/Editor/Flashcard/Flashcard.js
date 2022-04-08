import {
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grow,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";

//Translate API

let lastInputTimer = null;
const Flashcard = function (props) {
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);
  const [suggestions, setSuggestions] = useState([]);
  const [addImg, setAddImg] = useState(false);

  const handleSetImgUrl = async () => {
    if (!addImg && !isEmpty(props.dict)) {
      const [imgurl] = await props.dict.getImageUrls(sourceText);
      props.handleChange({
        id: props.id,
        pictureData: {
          url: imgurl,
          filename: `${sourceText}.jpg`,
          fields: ["Back"],
        },
      });
    }
  };

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
    if (!isEmpty(props.dict)) {
      if (inputText)
        lastInputTimer = setTimeout(async () => {
          const response = await props.dict.getTranslations(inputText);
          if (response) {
            setSuggestions(response);
          }
        }, 3000);
    }
  };

  return (
    <Zoom in={true}>
      <Card key={props.id} sx={styles.card}>
        <div>
          <TextField
            value={sourceText}
            onChange={handleSrcTxtChange}
          ></TextField>
          <ArrowForwardIosIcon />
          <TextField
            value={targetText}
            onChange={handleTrgtTxtChange}
          ></TextField>
        </div>
        <div>
          {suggestions.map((value) => (
            <Grow key={value} in={true} style={{ timeout: 1000 }}>
              <Chip
                key={value}
                label={value}
                onClick={handleTrgtTxtChange}
              ></Chip>
            </Grow>
          ))}
        </div>
        <FormGroup>
          <FormControlLabel
            onChange={() => {
              setAddImg(addImg ? false : true);
              handleSetImgUrl();
            }}
            control={<Checkbox />}
            label="Add image if exists"
          />
        </FormGroup>

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
