import { spacing } from "@mui/system";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  iconAdd: {
    margin: (theme) => theme.spacing(2),
    ml: "-2%",
  },
  formControl: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "flex-end",
    margin: (theme) => theme.spacing(2),
    mr: "100px",
  },
  circProg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: (theme) => theme.spacing(10),
  },
};

export default styles;
