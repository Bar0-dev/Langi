import { Container, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";
import { styled } from "@mui/system";

const SubHeader = (props) => {
  return (
    <Typography variant="h4" component="h2">
      {props.children}
    </Typography>
  );
};

const Paragraph = (props) => {
  return (
    <Typography variant="h6" component="p">
      {props.children}
    </Typography>
  );
};

export default function Home(props) {
  return (
    <Container sx={styles.mainContainer}>
      <Box sx={styles.hero}>
        <Typography variant="h3" component="h1">
          Langi
        </Typography>
        <Typography color="GrayText" variant="h5">
          Easy, responsive and intuitive for you to create language flashcards
          and decks faster.
        </Typography>
      </Box>
      <SubHeader>Get started</SubHeader>
      <Paragraph>
        To connect your local Anki app go to the{" "}
        <Link href="/howtoconnect">How to connect</Link> page and follow the
        tutorial. Or just go straight to creating a{" "}
        <Link href="/edit/newDeck">new deck</Link> and later export it to the
        file.
      </Paragraph>
      <SubHeader variant="h4" component="h2">
        Importing
      </SubHeader>
      <Paragraph>
        If you already have existing decks but you don't want to connect your
        Anki app, you can use the <Link href="/import">import</Link> function.
      </Paragraph>
      <SubHeader variant="h4" component="h2">
        Why langi?
      </SubHeader>
      <Paragraph>
        This application was built in order to facilitate working with Anki for
        language studying. It can be really tedious to use a plain Anki app and
        here is why:
      </Paragraph>
      <ul>
        <li>inconvenient cards creator interface</li>
        <li>an overwhelming amount of different settings</li>
        <li>hard to add pictures to the flashcard</li>
        <li>even harder to add pronunciation</li>
        <li>can't backtrack to previously created cards</li>
      </ul>
      <Paragraph>
        Langi fixes all of these problems giving you easy to use editor with
        automatic translations based on{" "}
        <Link href="https://www.wiktionary.org/">wiktionary.org</Link>. If you
        want to have an image or pronunciation on your card it's a matter of
        ticking a checkbox. (This feature is in development!)
      </Paragraph>
    </Container>
  );
}
