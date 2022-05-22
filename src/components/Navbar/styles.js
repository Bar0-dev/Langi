const styles = {
  appbar: { zIndex: (theme) => theme.zIndex.drawer + 1 },
  appbarMobile: {
    paddingTop: (theme) => theme.spacing(1),
    paddingBottom: (theme) => theme.spacing(1),
  },
  toolbar: {
    gap: (theme) => theme.spacing(2),
  },
  toolbarMobile: {
    flexDirection: "column",
  },
  upperBar: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: (theme) => theme.spacing(4),
    marginRight: (theme) => theme.spacing(4),
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: (theme) => theme.spacing(1),
  },
};

export default styles;
