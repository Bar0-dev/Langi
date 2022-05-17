import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  Header,
  HeaderAdditional,
  Paragraph,
  SubHeader,
} from "../common/textComps";
import styles from "./styles";

export default function DecksLoadFailed(props) {
  return (
    <Container sx={styles.container}>
      <Box sx={styles.header}>
        <Header>Loading Error</Header>
        <HeaderAdditional>Couldn't connect to Anki app</HeaderAdditional>
      </Box>
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
              <Button href="/howtoconnect" variant="outlined">
                How to connect
              </Button>
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
              <Button href="../newDeck" variant="outlined">
                New Deck
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
