import { Card, CardActions, CardContent, Button, Grid } from "@mui/material";
import CommonContainer from "../../components/common/CommonContainer/CommonContainer";
import {
  Header,
  Paragraph,
  SubHeader,
} from "../../components/common/textComps";

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
              <Button href="/newDeck">New deck</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </CommonContainer>
  );
}
