const styles = {
  flashcard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: (theme) => theme.spacing(4),
  },
  flashcardMobile: {
    width: "100%",
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  inputsMobile: {
    flexDirection: "column",
    width: "100%",
  },
  results: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  suggestions: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    maxWidth: "100%",
    flexWrap: "wrap",
  },
  image: {
    display: "flex",
    gap: "1rem",
    alignItems: "centet",
  },
  buttonsWrapper: {
    marginTop: (theme) => theme.spacing(2),
    width: "100%",
    display: "flex",
    gap: (theme) => theme.spacing(4),
    justifyContent: "flex-end",
  },
  textField: {
    width: "100%",
  },
};

export default styles;
