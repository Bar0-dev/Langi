import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  IconButton,
  FormControl,
  Button,
  List,
  Container,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./styles";
import EditorHeader from "./EditorHeader/EditorHeader";
import {
  handleAddCard,
  cardReactElements,
  handleSave,
  handleSetName,
  handleClose,
  resetChangeFlag,
} from "./editorController";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getCards, getDecksAndIDs } from "../../utilities/ankiAPI";
import { getCache, setCache } from "../../utilities/utilities";
import { Box } from "@mui/system";
import { useDialog } from "../common/Dialog/DialogContext";

const Editor = function (props) {
  const [deckName, setName] = useState("");
  const [cards, setCards] = useState(new Map());
  const [dict, setDict] = useState({});
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar } = useSnackbar();
  const deckId = useParams().deckId;
  const { setOpen: setDialogOpen, setContent, setData } = useDialog();
  const navigate = useNavigate();

  const loadCards = useCallback(
    async (id) => {
      try {
        if (deckId !== "newDeck") {
          const response = await getCards(id);
          if (!response) {
            navigate("../404");
            return false;
          }
          setCards(response);
          const decks = await getDecksAndIDs();
          const deckName = decks[deckId];
          setName(deckName);
          resetChangeFlag();
          if (deckName.length) return setStatus("successful");
        } else {
          setStatus("newDeck");
          setCards(new Map());
          setName("");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [deckId, navigate]
  );

  useEffect(() => {
    loadCards(deckId);
  }, [deckId, loadCards]);

  if (status === "loading") {
    return (
      <Container>
        <Box sx={styles.circProg}>
          <CircularProgress></CircularProgress>
        </Box>
      </Container>
    );
  } else if (status === "successful" || status === "newDeck") {
    return (
      <Container maxWidth="md" sx={styles.mainContainer}>
        <EditorHeader
          deckName={deckName ? deckName : ""}
          deckId={deckId}
          setDict={setDict}
          handleSetName={handleSetName(setName, status)}
        ></EditorHeader>
        <List>{cardReactElements(cards, setCards, dict)}</List>
        <IconButton
          sx={styles.iconAdd}
          onClick={handleAddCard(deckName, cards, setCards)}
        >
          <AddCircleIcon fontSize="large"></AddCircleIcon>
        </IconButton>
        <FormControl sx={styles.formControl}>
          <Button
            size="large"
            variant="contained"
            onClick={handleSave(
              deckId,
              deckName,
              cards,
              setCards,
              enqueueSnackbar,
              navigate
            )}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button
            size="large"
            variant="outlined"
            onClick={handleClose(setDialogOpen, setContent, setData, navigate)}
            startIcon={<CancelIcon />}
          >
            Close
          </Button>
        </FormControl>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default Editor;
