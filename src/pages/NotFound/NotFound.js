import { Typography } from "@mui/material";
import LinkButton from "../../components/common/LinkButton";
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
        <LinkButton to="/" variant="contained">
          Go back
        </LinkButton>
      </Box>
    </CommonContainer>
  );
}
