const styles = {
  mainContainer: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: (theme) => theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
    ml: (theme) => theme.spacing(3),
  },
  copyright: {
    mr: (theme) => theme.spacing(3),
  },
};

export default styles;
