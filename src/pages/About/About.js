import { Button, Container, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles";
import {
  SubHeader,
  Paragraph,
  Header,
} from "../../components/common/textComps";

export default function HowToConnect(props) {
  return (
    <Container maxWidth="md" sx={styles.mainContainer}>
      <Header>About Langi</Header>
      <SubHeader>Disclaimer</SubHeader>
      <Paragraph>
        This project was created as a portfolio piece by an inexperienced WebDev
        developer. There is no guarantee that every claimed functionality will
        work as intended. This is not a finished product nor a commercial app.
        Nevertheless, I hope you will find it useful.
      </Paragraph>
      <SubHeader>Anki is awesome ... but</SubHeader>
      <Paragraph>
        It is proven that Anki is way more efficient than just regular studying.
        Moreover, it is more efficient than traditional flashcards. Spaced
        repetition based on SM-2 algorithm allows you to memorize terms quickly
        and for good. Unfortunately, before we can even sit and study it is
        necessary to create a deck first. Many people share the same opinion
        that the Anki deck creation experience is not one of the best. Therefore
        this app comes in handy for those who are using Anki for studying
        languages.
      </Paragraph>
      <SubHeader>It can be counfusing to set this up</SubHeader>
      <Paragraph>
        Setting up Anki app, Add-on and config file might be a little hard for
        not tech-savvy people. Therefore I if you didn't succeed in following a{" "}
        <Link href="/howtoconnect">tutorial</Link>, I encourage you to ask
        someone you know that can handle this for you. I believe it is worth
        trying out.
      </Paragraph>
      <SubHeader>Technologies used</SubHeader>
      <Paragraph>
        JS, MUI, wiktionary-translations, MediaWiki/Wiktionary. NPM packages:
        ISO6931, axios, noistack
      </Paragraph>
    </Container>
  );
}
