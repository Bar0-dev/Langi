import { Masonry } from "@mui/lab";
import { Card, CardContent, CardActions } from "@mui/material";
import { Box } from "@mui/system";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";
import logo from "../../logo/logo.svg";
import styles from "./styles";
import LinkButton from "../../components/common/LinkButton";
import { useMediaQuery, breakPoints } from "../../utilities/utilities";

const HomeElement = (props) => {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <SubHeader>{props.title}</SubHeader>
        <Paragraph>{props.children}</Paragraph>
      </CardContent>
      <CardActions>
        <LinkButton variant="outlined" to={props.buttonLink}>
          {props.buttonText}
        </LinkButton>
      </CardActions>
    </Card>
  );
};

export default function Home(props) {
  const mediaQuery = useMediaQuery(breakPoints.tablet);

  return (
    <CommonContainer>
      <Box sx={styles.hero}>
        <Box sx={styles.logoWrapper}>
          <img style={{ width: "200px" }} className="logo" src={logo}></img>
        </Box>
        <Header subtext="Easy, responsive and intuitive flashcard editor">
          Langi
        </Header>
      </Box>
      <Masonry columns={mediaQuery ? 1 : 3} spacing={4}>
        <HomeElement
          title="Get started"
          buttonText="How to connect"
          buttonLink="/howtoconnect"
        >
          Follow how to connect tutorial to set up your local Anki program to
          work with this app.
        </HomeElement>
        <HomeElement
          title="Create a deck"
          buttonText="New Deck"
          buttonLink="/newDeck"
        >
          Don't have time for setting up a connection between the local and web
          app? Go ahead create your deck and export it later on.
        </HomeElement>
        <HomeElement title="Importing" buttonText="Import" buttonLink="/import">
          If you already have a text file with words you want to learn go ahead
          and import it. Use the translation feature and maybe use some pictures
          on your flashcard.
        </HomeElement>
        <HomeElement title="Local decks" buttonText="Decks" buttonLink="/decks">
          When the Anki program is running with the AnkiConnect addon and proper
          config, it is time to explore local decks.
        </HomeElement>
        <HomeElement title="Why langi?" buttonText="About" buttonLink="/about">
          To learn more about how this app was built, what features it has or
          what technologies were used please explore the about page.
        </HomeElement>
      </Masonry>
    </CommonContainer>
  );
}
