import { Button, Container, Grid, Paper, Typography } from "@mui/material";
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
import sample from "./sample.txt";
import { useSnackbar } from "notistack";

export default function Import(props) {
  const [status, setStatus] = useState("preload");
  const [cards, setCards] = useState(new Map());
  const handleBrowserOpen = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleFilePick = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    const name = file.name.replace(".txt", "");
    const textData = await file.text();
    const importedCards = await importDeckTxt(textData, name);
    if (importedCards) {
      setCards(importedCards);
      setStatus("loaded");
    } else {
      enqueueSnackbar("Import failed - wrong formatting", { variant: "error" });
    }
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.paper} elevation={2}>
              <SubHeader>Plain text file</SubHeader>
              <Paragraph>
                Source and target text are seperated by tab character. New card
                is indicated by a new line. Only source word can be provided
                aswell.
              </Paragraph>
              <Box sx={styles.codeBox}>
                <Typography sx={styles.codeTitle} variant="body2">
                  plaintext.txt
                </Typography>
                <iframe frameBorder="0" src={sample}></iframe>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.paper} elevation={2}>
              <SubHeader>Text file with HTML tags</SubHeader>
              <Paragraph>
                Source and target text are seperated by tab character. Every
                card starting with new line.
              </Paragraph>
              <Box sx={styles.codeBox}>
                <Typography sx={styles.codeTitle} variant="body2">
                  sample.txt
                </Typography>
                <iframe frameBorder="0" src={sample}></iframe>
              </Box>
            </Paper>
          </Grid>
        </Grid>

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
