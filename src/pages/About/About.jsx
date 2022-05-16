import {
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";
import {
  SubHeader,
  Paragraph,
  Header,
  HeaderAdditional,
} from "../../components/common/textComps";

const AboutCard = (props) => {
  return (
    <Card>
      <CardContent>
        <SubHeader>{props.title}</SubHeader>
        <Paragraph>{props.children}</Paragraph>
      </CardContent>
    </Card>
  );
};

export default function HowToConnect(props) {
  return (
    <Container maxWidth="md" sx={styles.mainContainer}>
      <Header>About</Header>
      <HeaderAdditional>Langi - flashcard app</HeaderAdditional>
      <AboutCard title="Disclaimer">
        This app is not a final product. It has been created as a part of a
        portfolio, nevertheless, it is a functional app that can facilitate
        language learning experience with Anki. Translations in an app are
        provided by a wiktionary scraper which is not perfect. Therefore this
        feature might be refined by using Google Translate as a translation
        engine.
      </AboutCard>
      <AboutCard title="Why Langi?">
        It is proven that Anki is way more efficient than just regular studying.
        Moreover, it is more efficient than traditional flashcards. Spaced
        repetition based on SM-2 algorithm allows you to memorize terms quickly
        and for good. Unfortunately, before we can even sit and study it is
        necessary to create a deck first. Many people share the same opinion
        that the Anki deck creation experience is not one of the best. Therefore
        this app comes in handy for those who are using Anki for studying
        languages.This application was built in order to facilitate working with
        Anki for language studying. It can be really tedious to use a plain Anki
        app and here is why:
        <ul>
          <li>inconvenient cards creator interface</li>
          <li>an overwhelming amount of different settings</li>
          <li>hard to add pictures to the flashcard</li>
          <li>even harder to add pronunciation</li>
          <li>can't backtrack to previously created cards</li>
        </ul>
      </AboutCard>
      <AboutCard title="Technologies used">
        JS, MUI, wiktionary-translations, MediaWiki/Wiktionary. NPM packages:
        ISO6931, axios, noistack
      </AboutCard>
      <AboutCard title="Contribute to the project">
        Looking for help with a project
      </AboutCard>
    </Container>
  );
}
