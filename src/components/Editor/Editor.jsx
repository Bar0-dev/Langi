import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { IconButton, List, Container, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditorHeader from "./EditorHeader/EditorHeader";
import {
  handleAddCard,
  cardReactElements,
  handleSave,
  handleSetName,
  handleClose,
  resetChangeFlag,
} from "./editorController";
import { useSnackbar } from "notistack";
import {
  exportDeckTxt,
  getCards,
  getDecksAndIDs,
} from "../../utilities/ankiAPI";
import { useDialog } from "../common/Dialog/DialogContext";
import ButtonsMenu from "./ButtonsMenu/ButtonsMenu";
import InLoading from "../common/InLoading/InLoading";
import {
  breakPoints,
  getCache,
  setCache,
  useMediaQuery,
} from "../../utilities/utilities";

import styles from "./styles";
import CommonContainer from "../common/CommonContainer/CommonContainer";

const Editor = function (props) {
  const mobileQuery = useMediaQuery(breakPoints.mobile);
  const [deckId, setDeckId] = useState(useParams().deckId);
  const [deckName, setName] = useState("");
  const [cards, setCards] = useState(new Map());
  const [dict, setDict] = useState({});
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar } = useSnackbar();
  const { setOpen: setDialogOpen, setContent, setData } = useDialog();
  const navigate = useNavigate();

  //cacheing
  if (!getCache(deckId))
    setCache(deckId, {
      suggestions: false,
      addImageFront: false,
      addImageBack: false,
      addPron: false,
      source: null,
      target: null,
    });
  const cachedSettings = getCache(deckId);
  const [settings, setSettings] = useState(cachedSettings);

  const loadCards = useCallback(
    async (id) => {
      try {
        const response = await getCards(id);
        if (response === "deckNotFound") {
          navigate("../404");
          return false;
        }
        if (response === "deckNotSupported") {
          navigate("../notSupported");
          return false;
        }
        setCards(response);
        const decks = await getDecksAndIDs();
        const deckName = decks[deckId];
        setName(deckName);
        resetChangeFlag();
        if (deckName.length) return setStatus("successful");
      } catch (error) {
        console.log(error);
      }
    },
    [deckId, navigate]
  );

  useEffect(() => {
    if (props.newDeck) {
      setDeckId("newDeck");
      setName("");
      setCards(new Map());
      setStatus("successful");
      if (props.auxCards) {
        setCards(props.auxCards);
      }
    } else {
      loadCards(deckId);
    }
  }, [deckId, loadCards, props.newDeck]);

  if (status === "loading") {
    return <InLoading />;
  }
  if (status === "successful") {
    return (
      <CommonContainer sx={styles.container}>
        <EditorHeader
          deckId={deckId}
          deckName={deckName ? deckName : ""}
          setDict={setDict}
          handleSetName={handleSetName(setName, deckId)}
          settings={settings}
          setSettings={setSettings}
          mobileQuery={mobileQuery}
        ></EditorHeader>
        <Stack sx={mobileQuery ? { width: "100%" } : null} spacing={2}>
          {cardReactElements(cards, setCards, dict, settings)}
        </Stack>
        <IconButton
          size="large"
          sx={styles.iconAdd}
          onClick={handleAddCard(deckName, cards, setCards)}
        >
          <AddCircleIcon fontSize="large"></AddCircleIcon>
        </IconButton>
        <ButtonsMenu
          deckId={deckId}
          deckName={deckName}
          cards={cards}
          mobileQuery={mobileQuery}
          handleClose={handleClose(
            setDialogOpen,
            setContent,
            setData,
            navigate
          )}
          handleSave={handleSave(
            deckId,
            deckName,
            cards,
            setCards,
            enqueueSnackbar,
            navigate
          )}
          handleExport={exportDeckTxt}
        ></ButtonsMenu>
      </CommonContainer>
    );
  }
};

export default Editor;
