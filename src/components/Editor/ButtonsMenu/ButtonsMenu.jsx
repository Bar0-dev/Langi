import { FormControl, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";

import styles from "./styles";

export default function ButtonsMenu(props) {
  return (
    <FormControl sx={styles.buttonsMenu}>
      <Button
        size="large"
        variant="contained"
        onClick={props.handleSave}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button variant="contained" startIcon={<DownloadIcon />}>
        Export
      </Button>
      <Button
        size="large"
        variant="outlined"
        onClick={props.handleClose}
        startIcon={<CancelIcon />}
      >
        Close
      </Button>
    </FormControl>
  );
}
