const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: (theme) => theme.spacing(4),
    marginBottom: (theme) => theme.spacing(4),
  },
  headerMobile: {
    flexDirection: "column",
  },
  logoWrapper: {
    maxWidth: "200px",
  },

  masonry: {
    margin: 0,
  },
};

export default styles;
