import { Container } from "@mui/material";
import styles from "./styles";

export default function CommonContainer(props) {
  return (
    <Container {...props} sx={{ ...props.sx, ...styles.container }}>
      {props.children}
    </Container>
  );
}
