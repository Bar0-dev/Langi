import { Card, CardActions, CardContent, Grid } from "@mui/material";
import CommonContainer from "../common/CommonContainer/CommonContainer";
import LinkButton from "../common/LinkButton";
import { Header, Paragraph, SubHeader } from "../common/textComps";

export default function DecksLoadFailed(props) {
  return (
    <CommonContainer>
      <Header subtext="Couldn't connect to Anki app">Loading Error</Header>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SubHeader>Connect the app</SubHeader>
              <Paragraph>
                Try connecting your local Anki program with a webapp by
                following the tutorial.
              </Paragraph>
            </CardContent>
            <CardActions>
              <LinkButton to="/howtoconnect" variant="outlined">
                How to connect
              </LinkButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SubHeader>Standalone deck</SubHeader>
              <Paragraph>
                Creating a new deck in the editor does not require connecting
                through AnkiConnect. Just export your deck and later import it
                in the Anki app. Make sure the "Allow HTML in fields" option is
                checked.
              </Paragraph>
            </CardContent>
            <CardActions>
              <LinkButton to="/newDeck" variant="outlined">
                New Deck
              </LinkButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </CommonContainer>
  );
}
