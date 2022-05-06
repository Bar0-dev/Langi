import {
  TextField,
  FormGroup,
  Switch,
  FormControlLabel,
  IconButton,
  Card,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import LoopIcon from "@mui/icons-material/Loop";
import ComboBox from "./ComboBox/ComboBox";
import styles from "./styles";
import { useEffect, useState } from "react";
// import { getCache, setCache } from "../../../utilities/utilities";
import WiktTransl from "wiktionary-translations";
import ISO6391 from "iso-639-1";

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

const EditorHeader = function (props) {
  const deckName = props.deckName;
  const [srcLang, setSrcLang] = useState(null);
  const [trgtLang, setTrgtLang] = useState(null);
  const [supportSrcLang, setSupportSrcLang] = useState(supportedLangs);
  const [supportTrgtLang, setSupportTrgtLang] = useState(supportedLangs);

  const handleSrcLangChange = (event, value) => {
    if (value) {
      setSrcLang(value);
      const tempTrgtLangs = supportedLangs.filter((lang) => lang !== value);
      setSupportTrgtLang(tempTrgtLangs);
    } else setSrcLang(null);
  };

  const handleTrgtLangChange = (event, value) => {
    if (value) {
      setTrgtLang(value);
      // setCache("settings", { ...getCache("settings"), trgtLang: value }, 7);
    } else setTrgtLang(null);
  };

  useEffect(() => {
    if (srcLang && trgtLang)
      props.setDict(
        new WiktTransl(ISO6391.getCode(srcLang), ISO6391.getCode(trgtLang))
      );
  }, [srcLang, trgtLang]);

  return (
    <Card sx={styles.root}>
      <FormGroup>
        <TextField
          label="Deck name"
          value={deckName}
          variant="standard"
          onChange={props.handleSetName}
        ></TextField>
        <Box sx={styles.langPicker}>
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
        <Box sx={styles.config}>
          <FormControlLabel
            control={<Switch />}
            checked={props.settings.suggestions}
            onChange={(event, value) =>
              props.setSettings({ ...props.settings, suggestions: value })
            }
            label="suggestions"
          />
          <FormControlLabel
            control={<Switch />}
            checked={props.settings.addImg}
            onChange={(event, value) =>
              props.setSettings({ ...props.settings, addImg: value })
            }
            label="add image"
          />
          <FormControlLabel
            control={<Switch />}
            checked={props.settings.addPron}
            onChange={(event, value) =>
              props.setSettings({ ...props.settings, addPron: value })
            }
            disabled={true}
            label="add pronunciation"
          />
        </Box>
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
