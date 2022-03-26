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
import { useEffect, useState } from "react";
import { getCache, setCache } from "../../../utilities/utilities";

// const parseLangs = (arr) => {
//   const uniqueCodes = [...new Set(arr.map((pair) => pair.source))];
//   const names = uniqueCodes
//     .map((langCode) => ISO6391.getName(langCode))
//     .filter((langName) => langName.length > 0);
//   return names;
// };

const EditorHeader = function (props) {
  const deckName = props.deckName;
  const deckId = props.deckId;
  const { srcLang, trgtLang } = props.langs;
  const [supportSrcLang, setSupportSrcLang] = useState([]);
  const [supportTrgtLang, setSupportTrgtLang] = useState([]);
  const { setSrcLang, setTrgtLang } = props.handleLangChange;

  //PLACEHOLDER
  const supportedLangs = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Italian",
    "Korean",
    "Swedish",
  ];
  //PLACEHOLDER

  const handleSrcLangChange = (event, value) => {
    if (value) {
      setSrcLang(value);
      const tempTrgtLangs = supportedLangs.filter((lang) => lang !== value);
      setSupportTrgtLang(tempTrgtLangs);
    }
  };

  const handleTrgtLangChange = (event, value) => {
    if (value) {
      setTrgtLang(value);
      // setCache("settings", { ...getCache("settings"), trgtLang: value }, 7);
    } else setTrgtLang("");
  };

  useEffect(() => {
    setSupportSrcLang(supportedLangs);
    setSupportTrgtLang(supportedLangs);
  }, []);

  return (
    <Card sx={styles.root}>
      <FormGroup>
        <TextField
          label="Deck name"
          value={deckName}
          variant="standard"
          onChange={props.handleSetName}
        ></TextField>
        <Box sx={styles.languiageSelectionBox}>
          <ComboBox
            value={srcLang}
            onChange={handleSrcLangChange}
            label="Source Language"
            languages={supportSrcLang}
          />
          <IconButton>
            <LoopIcon></LoopIcon>
          </IconButton>
          <ComboBox
            value={trgtLang}
            onChange={handleTrgtLangChange}
            label="Target Language"
            languages={supportTrgtLang}
          />
        </Box>

        <FormControlLabel
          control={<Switch />}
          label="Translation suggestions"
        />
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
