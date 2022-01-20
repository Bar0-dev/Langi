import { Card, Chip, IconButton, TextField, Zoom } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//PLACEHOLDER
const chips = ["castle", "lock", "chateau"];

const Flashcard = function (props) {
  const { sourceText, targetText } = props.data;
  return (
    <Zoom in={true}>
      <Card key={props.id} sx={styles.card}>
        <TextField
          value={sourceText}
          onChange={(e) =>
            props.handleChange({
              id: props.id,
              sourceText: e.target.value,
            })
          }
        ></TextField>
        <ArrowForwardIosIcon />
        <TextField
          value={targetText}
          onChange={(e) =>
            props.handleChange({
              id: props.id,
              targetText: e.target.value,
            })
          }
        ></TextField>
        {chips.map((value) => (
          <Chip key={value} label={value} onClick={() => {}}></Chip>
        ))}

        <IconButton
          onClick={() => {
            props.removeSelf(props.id);
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </Card>
    </Zoom>
  );
};
export default Flashcard;
