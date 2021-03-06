import { Masonry } from "@mui/lab";
import { Card, CardContent, CardActions, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";
import styles from "./styles";
import LinkButton from "../../components/common/LinkButton";
import {
  useMediaQuery,
  breakPoints,
  getCache,
} from "../../utilities/utilities";

const Logo = (props) => {
  const { palette } = useTheme();
  return (
    <img
      src="logo/logo.svg"
      style={palette.mode === "dark" ? styles.logoFilter : null}
    ></img>
  );
};

const HomeHeader = (props) => {
  if (props.mobileQuery) {
    return (
      <Box sx={{ ...styles.header, ...styles.headerMobile }}>
        <Box sx={styles.logoWrapper}>
          <Logo />
        </Box>
        <Header subtext="Easy, responsive and intuitive flashcard editor">
          Langi
        </Header>
      </Box>
    );
  } else {
    return (
      <Box sx={styles.header}>
        <Box sx={styles.logoWrapper}>
          <Logo />
        </Box>
        <Header subtext="Easy, responsive and intuitive flashcard editor">
          Langi
        </Header>
      </Box>
    );
  }
};

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
  const mobileQuery = useMediaQuery(breakPoints.mobile);

  return (
    <CommonContainer>
      <HomeHeader mobileQuery={mobileQuery}></HomeHeader>
      <Masonry sx={styles.masonry} columns={mobileQuery ? 1 : 3} spacing={4}>
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
