import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";
import LinkButton from "../../components/common/LinkButton";

export default function Home(props) {
  return (
    <Container>
      <Box sx={styles.hero}>
        <Typography align="center" variant="h4">
          Welcome to Langi
        </Typography>
        <Typography color="GrayText" align="center" variant="h5">
          Easy and responsive flashcards creator for Anki ecosystem
        </Typography>
      </Box>
      <Box sx={styles.buttonGroup}>
        <LinkButton link="/newDeck" text="New" />
        <LinkButton link="/" text="Explore" />
        <LinkButton link="/" text="Import" />
        <LinkButton link="/" text="Learn" />
        <LinkButton link="/" text="About" />
      </Box>
    </Container>
  );
}
