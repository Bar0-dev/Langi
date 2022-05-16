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
import samplePlainTxt from "./samplePlainText.txt";
import sampleHtml from "./sampleHtml.txt";
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
                Fields shall always be separated with the tab key. The new card
                starts with a new line. Single-word per line would be considered
                as a source word.
              </Paragraph>
              <Box sx={styles.codeBox}>
                <iframe
                  width="100%"
                  frameBorder="0"
                  src={samplePlainTxt}
                ></iframe>
                <Typography variant="body2">plaintext.txt</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.paper} elevation={2}>
              <SubHeader>Text file with HTML tags</SubHeader>
              <Paragraph>
                Each field shall be separated with a tab key. HTML tags can't
                have any separators unless it's a tab separator between two
                fields. Using id props as in the example can significantly help
                the algorithm recognize appropriate fields.
              </Paragraph>
              <Box sx={styles.codeBox}>
                <iframe width="100%" frameBorder="0" src={sampleHtml}></iframe>
                <Typography sx={styles.codeTitle} variant="body2">
                  htmlTagsText.txt
                </Typography>
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
        <Button variant="contained" onClick={handleClick}>
          Import
        </Button>
      </Container>
    );
  if (status === "loaded")
    return <Editor newDeck={true} auxCards={cards}></Editor>;
}
