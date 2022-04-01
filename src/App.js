import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Edit from "./pages/Edit";
import Decks from "./pages/Decks";
import Learn from "./pages/Learn";
import HowToConnect from "./pages/HowToConnect/HowToConnect";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import NotFound from "./pages/NotFound/NotFound";
import { DialogProvider } from "./components/common/Dialog/DialogContext";
import Footer from "./components/common/Footer/Footer";
import Import from "./pages/Import/Import";

const appLocalStorage = window.localStorage;
if (!appLocalStorage.getItem("mode")) appLocalStorage.setItem("mode", "light");

const links = {
  home: "/",
  edit: "/edit",
  newDeck: "/edit/newDeck",
  decks: "/decks",
  about: "/about",
  import: "/import",
};

const comps = {
  "/": <Home />,
  // "/edit": <Edit />, added as seperate
  "/decks": <Decks />,
  "/learn": <Learn />,
  "/howtoconnect": <HowToConnect />,
  "/about": <About />,
  "/import": <Import></Import>,
};

const App = function (props) {
  const savedMode = appLocalStorage.getItem("mode");
  const [mode, setMode] = useState(savedMode);
  const toggleMode = (event) => {
    const mode = event.target.checked ? "dark" : "light";
    setMode(mode);
    appLocalStorage.setItem("mode", mode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <DialogProvider>
            <Navbar
              links={links}
              darkIsOn={mode === "dark" ? true : false}
              toggleMode={toggleMode}
            ></Navbar>
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
