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

//PLACEHOLDER
const languagesPlaceholder = [
  { label: "Polish" },
  { label: "Swedish" },
  { label: "English" },
]; //This array to be reaplced with API response

const EditorHeader = function (props) {
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
          <ComboBox label="Source Text" languages={languagesPlaceholder} />
          <IconButton>
            <LoopIcon></LoopIcon>
          </IconButton>
          <ComboBox label="Target Text" languages={languagesPlaceholder} />
        </Box>

        <FormControlLabel control={<Switch />} label="Automatic translation" />
      </FormGroup>
    </Card>
  );
};

export default EditorHeader;
