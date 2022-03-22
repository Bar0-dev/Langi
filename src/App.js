import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Edit from "./pages/Edit";
import Decks from "./pages/Decks";
import NewDeck from "./pages/NewDeck";
import Learn from "./pages/Learn";
import HowToConnect from "./pages/HowToConnect/HowToConnect";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import NotFound from "./pages/NotFound/NotFound";
import { DialogProvider } from "./components/common/Dialog/DialogContext";
import Footer from "./components/common/Footer/Footer";

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
  "/howtoconnect": <HowToConnect />,
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
    <ThemeProvider theme={themeCreator(mode)}>
      <CssBaseline />
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <DialogProvider>
            {" "}
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
              <Route path="*">
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Footer />
          </DialogProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
