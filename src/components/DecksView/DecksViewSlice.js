import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIndexById } from "../../utilities";
import { getDecksAndIDs } from "../../ankiAPI";

const deckTemplate = (deckId, deckName) => ({
  id: deckId,
  name: deckName,
});

export const decksSlice = createSlice({
  name: "deckView",
  initialState: {
    decks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addDeck: (state, action) => {
      state.decks.push(
        deckTemplate(1, action.payload.name, action.payload.cards)
      );
    },
    removeDeck: (state, action) => {
      const index = getIndexById(action.payload, state.decks);
      state.decks.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDecks.pending, (state, action) => {
        //clear array before loading new cards
        state.cards = [];
        state.status = "loading";
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.status = "succeded";
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchDecks = createAsyncThunk(
  "decks/fetchDecks",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getDecksAndIDs();
      if (!response) return rejectWithValue("Could not connect to the anki");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const { addDeck, removeDeck, loadDecks } = decksSlice.actions;

export default decksSlice.reducer;

export const decksStatus = (state) => state.deckView.status;
export const selectDecks = (state) => state.deckView.decks;

export const selectDeckById = (state) => (id) =>
  state.decks.decks.filter((deck) => deck.id === id);
