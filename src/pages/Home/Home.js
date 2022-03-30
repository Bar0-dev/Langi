import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";

export default function Home(props) {
  return (
    <Container sx={styles.mainContainer}>
      <Box sx={styles.hero}>
        <Typography align="center" variant="h3" component="h1">
          Langi
        </Typography>
        <Typography color="GrayText" align="center" variant="h5">
          Easy, responsive and intuitive for you to create language flashcards
          and decks faster.
        </Typography>
      </Box>
      <Box sx={styles.content}>
        <Typography align="center" variant="h4" component="h2">
          Get started
        </Typography>
        <Typography align="center" variant="h6" component="p">
          To connect your local Anki app go to the "How to connect" page.
        </Typography>
        <Box sx={styles.buttonPosition}>
          <Button href="/howtoconnect" variant="outlined">
            How to connect
          </Button>
        </Box>
        <Typography align="center" variant="h6" component="p">
          Or just go straight to creating a new deck and later export it.
        </Typography>
        <Box sx={styles.buttonPosition}>
          <Button href="/edit/newDeck" variant="outlined">
            New Deck
          </Button>
        </Box>
        <Typography align="center" variant="h4" component="h2">
          Importing
        </Typography>
        <Typography align="center" variant="h6" component="p">
          If you already have existing decks but you don't want to connect your
          Anki app, you can use the import function.
        </Typography>
        <Box sx={styles.buttonPosition}>
          <Button href="/import" variant="outlined">
            Import
          </Button>
        </Box>
        <Typography align="center" variant="h4" component="h2">
          Why langi?
        </Typography>
        <Typography align="center" variant="h6" component="p">
          This application was built in order to facilitate working with Anki
          for language studying. It can be really tedious to use a plain Anki
          app and here is why:{" "}
        </Typography>
        <ul>
          <li>no user-friendly interface for cards creation</li>
          <li>an overwhelming amount of different settings</li>
          <li>hard to add pictures</li>
          <li>very hard to add pronunciation</li>
          <li>can't backtrack to previously created cards</li>
        </ul>
        <Typography align="center" variant="h6" component="p">
          Langi fixes all of these problems giving you easy to use editor with
          automatic translations based on{" "}
          <a href="https://www.wiktionary.org/">wiktionary.org</a>. If you want
          to have an image or pronunciation on your card it's a matter of
          ticking a checkbox on the flashcard. (This feature is in development!)
        </Typography>
      </Box>
    </Container>
  );
}
