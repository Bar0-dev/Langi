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
import { getCache, setCache } from "../../../utilities/utilities";

const parseLangs = (arr) => {
  const uniqueCodes = [...new Set(arr.map((pair) => pair.source))];
  const names = uniqueCodes
    .map((langCode) => ISO6391.getName(langCode))
    .filter((langName) => langName.length > 0);
  return names;
};

const EditorHeader = function (props) {
  const deckName = props.deckName;
  const deckId = props.deckId;
  const { srcLang, trgtLang } = props.langs;
  const [supportSrcLang, setSupportSrcLang] = useState([]);
  const [supportTrgtLang, setSupportTrgtLang] = useState([]);
  const { setSrcLang, setTrgtLang } = props.handleLangChange;

  //Translation API (!!!TO BE UPDATED!!!)
  // const loadSupportLang = async () => {
  //   try {
  //     const savedLangPairs = getCache(deckId);
  //     if (savedLangPairs) {
  //       const srcLangNames = parseLangs(savedLangPairs);
  //       setSupportSrcLang(srcLangNames);
  //     } else {
  //       const langPairs = await getSupportedLang();
  //       setCache(deckId, langPairs, 7);
  //       const srcLangNames = parseLangs(langPairs);
  //       setSupportSrcLang(srcLangNames);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSrcLangChange = (event, value) => {
    if (value) {
      setSrcLang(value);
      setCache("settings", { ...getCache("settings"), srcLang: value }, 7);
      const code = ISO6391.getCode(value);
      const langPairs = getCache(deckId);
      const trgtLangNames = langPairs
        .filter((pair) => pair.source === code)
        .map((pair) => pair.target)
        .map((langCode) => ISO6391.getName(langCode))
        .filter((langName) => langName.length > 0);
      setSupportTrgtLang(trgtLangNames);
    } else setSrcLang("");
  };

  const handleTrgtLangChange = (event, value) => {
    if (value) {
      setTrgtLang(value);
      setCache("settings", { ...getCache("settings"), trgtLang: value }, 7);
    } else setTrgtLang("");
  };

  useEffect(() => {
    // loadSupportLang();
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

        <FormControlLabel control={<Switch />} label="Automatic translation" />
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
