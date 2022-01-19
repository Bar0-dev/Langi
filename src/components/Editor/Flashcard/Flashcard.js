import { Card, Chip, IconButton, TextField, Zoom } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//PLACEHOLDER
const chips = ["castle", "lock", "chateau"];

const Flashcard = function (props) {
  const [sourceText, setSourceText] = useState(props.data.sourceText);
  const [targetText, setTargetText] = useState(props.data.targetText);

  return (
    <Zoom in={true}>
      <Card key={props.data.id} sx={styles.card}>
        <TextField
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
        ></TextField>
        <ArrowForwardIosIcon />
        <TextField
          value={targetText}
          onChange={(e) => setTargetText(e.target.value)}
        ></TextField>
        {chips.map((value) => (
          <Chip key={value} label={value} onClick={() => {}}></Chip>
        ))}

        <IconButton
          onClick={() => {
            props.removeSelf(props.data.id);
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </Card>
    </Zoom>
  );
};
export default Flashcard;
