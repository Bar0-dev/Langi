const styles = {
  paper: {
    display: "flex",
    justifyContent: "center",
    padding: (theme) => theme.spacing(4),
    gap: (theme) => theme.spacing(4),
  },
  paperMobile: {
    flexDirection: "column",
  },
  langPicker: {
    display: "flex",
    justifyContent: "center",
    gap: (theme) => theme.spacing(2),
  },
  swapIcon: {
    marginTop: "20px",
  },
  config: {
    mt: (theme) => theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
};

export default styles;
