const styles = {
  paper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: (theme) => theme.spacing(4),
    gap: (theme) => theme.spacing(4),
  },
  paperMobile: {
    flexDirection: "column",
    width: "100%",
  },
  headerColumn: {
    width: "50%",
  },
  headerColumnMobile: {
    width: "100%",
  },
  form: {
    display: "flex",
    gap: (theme) => theme.spacing(2),
  },
  langPicker: {
    display: "flex",
    justifyContent: "center",
    gap: (theme) => theme.spacing(2),
  },
  langPickerMobile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
