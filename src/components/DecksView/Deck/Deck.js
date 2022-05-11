import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./styles";
import LinkButton from "../../common/LinkButton";
import { useDialog } from "../../common/Dialog/DialogContext";

export default function Deck(props) {
  const { setOpen, setContent, setData } = useDialog();

  const handleDialogOpen = () => {
    setContent({
      title: "Confirm remove",
      message: `Do you want to remove deck: ${props.name}`,
    });
    setData({ action: "removeDeck", payload: props.id });
    setOpen(true);
  };

  return (
    <Card sx={styles.deck}>
      <CardContent>
        <Typography variant="h5" component="label">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <LinkButton link={`/edit/${props.id}`} text="Edit" />
        <Button
          color="inherit"
          onClick={() => {
            props.handleExport(props.id, props.name);
          }}
        >
          Export
        </Button>
        <Button color="inherit" variant="text" onClick={handleDialogOpen}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
