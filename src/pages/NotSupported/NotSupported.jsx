import { Card, CardActions, CardContent, Grid } from "@mui/material";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";
import {
  Header,
  Paragraph,
  SubHeader,
} from "../../components/common/textComps";
import LinkButton from "../../components/common/LinkButton";

export default function NotSupported(props) {
  return (
    <CommonContainer>
      <Header
        subtext="This deck is not following the default pattern of an Anki deck, and thus
        it can't be imported"
      >
        Error importing deck
      </Header>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SubHeader>Future support</SubHeader>
              <Paragraph>
                It is planned to implement deck fields interpreting tools.
              </Paragraph>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SubHeader>New Deck</SubHeader>
              <Paragraph>
                In the meantime please use New deck page to create a deck with
                liked words.
              </Paragraph>
            </CardContent>
            <CardActions>
              <LinkButton to="/newDeck">New deck</LinkButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </CommonContainer>
  );
}
