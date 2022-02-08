import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import Deck from "./Deck/Deck";
import { getDecksAndIDs } from "../../utilities/ankiAPI";
import { useEffect, useState } from "react";

export default function DecksView(props) {
  const [decks, setDecks] = useState(null);

  const loadDecks = async () => {
    const response = await getDecksAndIDs();
    setDecks(response);
  };
  useEffect(() => {
    if (!decks) {
      loadDecks();
    }
  }, []);
  // if (loadStatus === "idle" || loadStatus === "loading") {
  //   return (
  //     <Paper>
  //       <Box
  //         sx={{ display: "flex", justifyContent: "center", padding: "50px" }}
  //       >
  //         <CircularProgress />
  //       </Box>
  //     </Paper>
  //   );
  // }
  if (!decks) {
    return (
      <Paper>
        <Typography>Could not connet to the anki app</Typography>
      </Paper>
    );
  }
  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {Object.entries(decks).map(([key, value]) => (
          <Grid key={key} item xs={6}>
            <Deck id={key} name={value}></Deck>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
