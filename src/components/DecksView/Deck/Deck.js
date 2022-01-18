import { Card, CardActions, CardContent, Typography } from "@mui/material";
import styles from "./styles";
import { LinkButton } from "../../../utilities";

export default function Deck(props) {
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
        <LinkButton link="/" text="Delete" />
      </CardActions>
    </Card>
  );
}
