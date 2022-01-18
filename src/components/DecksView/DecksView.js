import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import Deck from "./Deck/Deck";
import { useSelector, useDispatch } from "react-redux";
import { selectDecks, fetchDecks, decksStatus } from "./DecksViewSlice";
import { useEffect } from "react";

export default function DecksView(props) {
  const decks = useSelector(selectDecks);
  const loadStatus = useSelector(decksStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadStatus === "idle") {
      dispatch(fetchDecks());
    }
  }, [loadStatus, dispatch]);
  if (loadStatus === "idle" || loadStatus === "loading") {
    return (
      <Paper>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "50px" }}
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }
  if (loadStatus === "failed") {
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
