import {
  TextField,
  FormGroup,
  Switch,
  FormControlLabel,
  IconButton,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import LoopIcon from "@mui/icons-material/Loop";
import ComboBox from "./ComboBox/ComboBox";
import styles from "./styles";
import { getSupportedLang } from "../../../utilities/translateAPI";
import { useEffect, useState } from "react";
import ISO6391 from "iso-639-1";

const EditorHeader = function (props) {
  const [languages, setLanguages] = useState([]);
  //Translation API
  const loadLanguages = async () => {
    const { languagePairs } = await getSupportedLang();
    const languagesParsed = [
      ...new Set(languagePairs.map((pair) => ISO6391.getName(pair.source))),
    ]
      .filter((lang) => lang.length > 0)
      .map((lang) => ({
        label: lang,
      }));

    setLanguages(languagesParsed);
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  return (
    <Card sx={styles.root}>
      <FormGroup>
        <TextField
          label="Deck name"
          value={props.deckName}
          variant="standard"
          onChange={props.setName}
        ></TextField>
        <Box sx={styles.languiageSelectionBox}>
          <ComboBox label="Source Language" languages={languages} />
          <IconButton>
            <LoopIcon></LoopIcon>
          </IconButton>
          <ComboBox label="Target Language" languages={languages} />
        </Box>

        <FormControlLabel control={<Switch />} label="Automatic translation" />
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
