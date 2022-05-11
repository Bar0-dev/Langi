const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: (theme) => theme.spacing(3),
    marginTop: (theme) => theme.spacing(2),
  },
  errorIcon: {
    display: "flex",
    justifyContent: "center",
    margin: (theme) => theme.spacing(4),
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  button: { display: "flex", justifyContent: "center", margin: "20px" },
};

export default styles;
