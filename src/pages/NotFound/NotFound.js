import { Container, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/system";
import styles from "./styles";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";

export default function NotFound(props) {
  return (
    <CommonContainer>
      <Box sx={styles.errorIcon}>
        <ErrorOutlineIcon fontSize="large"></ErrorOutlineIcon>
      </Box>
      <Typography align="center" variant="h5" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography align="center" variant="h6" gutterBottom>
        This page does not exist
      </Typography>
      <Box sx={styles.button}>
        <Button href="/" variant="contained">
          Go back
        </Button>
      </Box>
    </CommonContainer>
  );
}
