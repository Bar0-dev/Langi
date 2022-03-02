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
  const { setOpen, setTitle, setMessage, setData } = useDialog();

  const handleDialogOpen = () => {
    setTitle("Confirm remove");
    setMessage(`Do you want to remove deck: ${props.name}`);
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
        <LinkButton link="/" text="Export" />
        <Button color="inherit" variant="text" onClick={handleDialogOpen}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
