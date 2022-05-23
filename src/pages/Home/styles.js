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
  logoFilter: {
    filter:
      "invert(100%) sepia(100%) saturate(1%) hue-rotate(326deg) brightness(103%) contrast(102%)",
  },
  masonry: {
    margin: 0,
  },
};

export default styles;
