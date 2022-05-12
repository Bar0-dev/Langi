import { Button, Container, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { importDeckTxt } from "../../utilities/ankiAPI";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";
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
      <Container>
        <Header>Importing</Header>

        <SubHeader>File formatting</SubHeader>
        <Paragraph>
          Text files should consist with each line as a single flashcard. Each
          word separated by a tab, where first one is a souce text, second
          target text and finally tags.
        </Paragraph>
        <code>
          example{"\t"}beispiel{"\t"}
        </code>

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
