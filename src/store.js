import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./components/DecksView/DecksViewSlice";

export default configureStore({
  reducer: {
    deckView: decksReducer,
  },
});
