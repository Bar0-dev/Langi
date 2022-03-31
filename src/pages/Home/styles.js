const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    my: (theme) => theme.spacing(4),
  },
  content: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonPosition: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    m: (theme) => theme.spacing(2),
  },
};

export default styles;
