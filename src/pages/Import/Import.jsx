import { Button, Container, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { importDeckTxt } from "../../utilities/ankiAPI";
import {
  Paragraph,
  Header,
  HeaderAdditional,
  SubHeader,
} from "../../components/common/textComps";
import { Box } from "@mui/system";
import styles from "./styles";
import Editor from "../../components/Editor/Editor";

export default function Import(props) {
  const [status, setStatus] = useState("preload");
  const [cards, setCards] = useState(new Map());
  const handleBrowserOpen = useRef(null);
  const handleFilePick = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    const name = file.name.replace(".txt", "");
    const textData = await file.text();
    const importedCards = await importDeckTxt(textData, name);
    setCards(importedCards);
    setStatus("loaded");
  };
  const handleClick = () => {
    handleBrowserOpen.current.click();
  };
  if (status === "preload")
    return (
      <Container sx={styles.container}>
        <Box sx={styles.header}>
          <Header>Importing</Header>
          <HeaderAdditional>
            Upload text file with words you always wanted to learn
          </HeaderAdditional>
        </Box>
        <Paper sx={styles.paper} elevation={2}>
          <SubHeader>File formatting</SubHeader>
          <Paragraph>
            In order for this to work you should follow the pattern shown in the
            code snippet below. Word in source language comes first, then
            translated separated with tab. Next card shall be seperated with new
            line.
          </Paragraph>
          <Box sx={styles.codeBox}>
            <Typography sx={styles.codeTitle} variant="body2">
              sample.txt
            </Typography>
            <code>
              dog hund <br /> cat katt <br /> horse hast
            </code>
          </Box>
        </Paper>

        <input
          ref={handleBrowserOpen}
          type="file"
          accept=".txt"
          onChange={handleFilePick}
          style={{ display: "none" }}
        />
        <Button onClick={handleClick}>Import</Button>
      </Container>
    );
  if (status === "loaded")
    return <Editor newDeck={true} auxCards={cards}></Editor>;
}
