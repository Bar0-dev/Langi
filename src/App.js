import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit";
import Decks from "./pages/Decks";
import NewDeck from "./pages/NewDeck";
import Learn from "./pages/Learn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { SnackbarProvider } from "notistack";

const appLocalStorage = window.localStorage;
if (!appLocalStorage.getItem("mode")) appLocalStorage.setItem("mode", "light");

const links = {
  home: "/",
  edit: "/edit",
  newDeck: "/newDeck",
  learn: "/learn",
  decks: "/decks",
  about: "/about",
};

const comps = {
  "/": <Home />,
  // "/edit": <Edit />,
  "/newDeck": <NewDeck />,
  "/decks": <Decks />,
  "/learn": <Learn />,
};

const themeCreator = (currentMode) =>
  createTheme({
    palette: {
      mode: currentMode,
    },
  });

const App = function (props) {
  const savedMode = appLocalStorage.getItem("mode");
  const [mode, setMode] = useState(savedMode);
  const toggleMode = (event) => {
    const mode = event.target.checked ? "dark" : "light";
    setMode(mode);
    appLocalStorage.setItem("mode", mode);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeCreator(mode)}>
        <SnackbarProvider maxSnack={3}>
          <div>
            <Navbar
              links={links}
              darkIsOn={mode === "dark" ? true : false}
              toggleMode={toggleMode}
            ></Navbar>
          </div>
          <Routes>
            {Object.entries(comps).map(([path, comp]) => (
              <Route key={path} path={path} element={comp} />
            ))}
            <Route path="/edit" element={<Edit />}>
              <Route path=":deckId" element={<Edit />} />
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
