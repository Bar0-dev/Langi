import styles from "./styles";
import { Box } from "@mui/system";
import { Container, CircularProgress } from "@mui/material";

export default function InLoading(props) {
  return (
    <Container>
      <Box sx={styles.circProg}>
        <CircularProgress></CircularProgress>
      </Box>
    </Container>
  );
}
