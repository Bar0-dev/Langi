import { spacing } from "@mui/system";

const styles = {
  buttonsMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "flex-end",
    margin: (theme) => theme.spacing(2),
    mr: "100px",
    mb: (theme) => theme.spacing(10),
  },
};

export default styles;
