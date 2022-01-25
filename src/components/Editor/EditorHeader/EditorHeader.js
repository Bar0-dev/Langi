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
  const { setSrcLang, setTrgtLang } = props.handleLangChange;

  //Translation API
  const loadLanguages = async () => {
    const languages = await getSupportedLang();
    const languagesExtended = languages
      .map((langShort) => ISO6391.getName(langShort))
      .filter((lang) => lang.length > 0)
      .map((lang) => ({
        label: lang,
      }));

    setLanguages(languagesExtended);
  };

  const handleSrcLangChange = (event, value) => {
    if (value) {
      setSrcLang(value.label);
    } else setSrcLang("");
  };

  const handleTrgtLangChange = (event, value) => {
    if (value) {
      setTrgtLang(value.label);
    } else setTrgtLang("");
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
          <ComboBox
            onChange={handleSrcLangChange}
            label="Source Language"
            languages={languages}
          />
          <IconButton>
            <LoopIcon></LoopIcon>
          </IconButton>
          <ComboBox
            onChange={handleTrgtLangChange}
            label="Target Language"
            languages={languages}
          />
        </Box>

        <FormControlLabel control={<Switch />} label="Automatic translation" />
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
