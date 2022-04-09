const styles = {
  root: {
    minWidth: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // background: "linear-gradient(to right, #005c97, #363795)",
    padding: "20px",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    mt: "10px",
    padding: "30px",
  },
  langPicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  config: {
    mt: (theme) => theme.spacing(2),
  },
};

export default styles;
