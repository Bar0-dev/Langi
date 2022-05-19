import styles from "./styles";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import CommonContainer from "../CommonContainer/CommonContainer";

export default function InLoading(props) {
  return (
    <CommonContainer>
      <Box sx={styles.circProg}>
        <CircularProgress></CircularProgress>
      </Box>
    </CommonContainer>
  );
}
