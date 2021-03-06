import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  useMediaQuery,
} from "@mui/material";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";

import styles from "./styles";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";
import { Masonry } from "@mui/lab";
import { Box } from "@mui/system";
import { breakPoints } from "../../utilities/utilities";

const AboutCard = (props) => {
  return (
    <Card>
      <CardContent>
        <SubHeader>{props.title}</SubHeader>
        <Paragraph>{props.children}</Paragraph>
        {props.list ?? null}
      </CardContent>
      <CardActions>{props.controlls}</CardActions>
    </Card>
  );
};

export default function HowToConnect(props) {
  const mobileQuery = useMediaQuery(breakPoints.mobile);

  return (
    <CommonContainer>
      <Header subtext="Langi - flashcard app">About</Header>
      <Masonry sx={styles.masonry} columns={mobileQuery ? 1 : 2} spacing={4}>
        <AboutCard title="Disclaimer">
          This app is not a final product. It has been created as a part of a
          portfolio, nevertheless, it is a functional app that can facilitate
          language learning experience with Anki. Translations in an app are
          provided by a wiktionary scraper which is not perfect. Therefore this
          feature might be refined in the future by using Google Translate as a
          translation engine.
        </AboutCard>
        <AboutCard title="Why Langi?">
          Anki is way more efficient than just regular studying. Moreover, it is
          more efficient than traditional flashcards. Spaced repetition based on
          SM-2 algorithm allows you to memorize terms quickly. Before studying
          though, it is necessary to create a deck first. This app comes in
          handy for those who find creating a personal deck in Anki hard.
        </AboutCard>
        <AboutCard
          title="Contribution"
          controlls={
            <Button variant="outlined" href="https://github.com/Bar0-dev/Langi">
              Open repository
            </Button>
          }
          list={
            <ul>
              <li>
                <Link href="https://reactjs.org/">ReactJS</Link>
              </li>
              <li>
                <Link href="https://reactrouter.com/">React Router</Link>
              </li>
              <li>
                <Link href="https://mui.com/">MUI</Link>
              </li>
              <li>
                <Link href="https://foosoft.net/projects/anki-connect/">
                  AnkiConnect
                </Link>
              </li>
              <li>
                <Link href="https://axios-http.com/docs/intro">Axios</Link>
              </li>
              <li>more NPM packages to be reviewd in the source code</li>
            </ul>
          }
        >
          For those who are more interested in how this app was built, I
          encourage you to visit my GitHub page and review the source code. If
          you feel like you could contribute to the project and make It better
          please do not hesitate to contact me or even go straight to creating a
          pull request. To make things easier for contributors, here is a list
          of used technologies:
        </AboutCard>
        <AboutCard
          title="About the author"
          controlls={
            <Button variant="outlined" href="">
              Portfolio
            </Button>
          }
        >
          I am an emerging Web Developer who simply learned coding by making
          apps like this one. Coming from automation and mechanical engineering
          makes me a pragmatic programmer for whom understanding and
          implementation of algorithms comes easy. To check out more projects of
          mine follow the link to my portfolio webpage.
        </AboutCard>
      </Masonry>
    </CommonContainer>
  );
}
