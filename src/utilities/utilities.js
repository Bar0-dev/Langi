export const snackbarDispatcher = (actions, invokeSnackbar) => {
  actions.forEach(([message, variant]) =>
    invokeSnackbar(message, { variant: variant })
  );
};
export const setCache = (key, value, expiryDays) => {
  let expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const item = {
    value: value,
    expiry: expiryDate.getTime(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
