import { Button, Container, Typography } from "@mui/material";
import { useRef } from "react";
import { importDeckTxt } from "../../utilities/ankiAPI";
import { Box } from "@mui/system";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";
import styles from "./styles";

export default function Import(props) {
  const handleBrowserOpen = useRef(null);
  const handleFilePick = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    console.log(file);
    const name = file.name.replace(".txt", "");
    const textData = await file.text();
    importDeckTxt(textData, name);
  };
  const handleClick = () => {
    handleBrowserOpen.current.click();
  };
  return (
    <Container>
      <Header>Importing</Header>

      <SubHeader>File formatting</SubHeader>
      <Paragraph>
        Text files should consist with each line as a single flashcard. Each
        word separated by a tab, where first one is a souce text, second target
        text and finally tags.
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
}
