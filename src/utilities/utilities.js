export const snackbarDispatcher = (actions, invokeSnackbar) => {
  actions.forEach(([message, variant]) =>
    invokeSnackbar(message, { variant: variant })
  );
};
