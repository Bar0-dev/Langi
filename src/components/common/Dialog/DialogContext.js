import { createContext, useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import dialogDispatcher from "./DialogController";

export const DialogContext = createContext();

export function useDialog() {
  return useContext(DialogContext);
}

export function AppDialog(props) {
  const handleClose = () => props.setOpen(false);
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleUserResponse}>Ok</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const handleUserResponse = () => {
    dialogDispatcher(data);
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ setOpen, setTitle, setMessage, setData }}>
      {children}
      <AppDialog
        open={open}
        setOpen={setOpen}
        title={title}
        message={message}
        handleUserResponse={handleUserResponse}
      ></AppDialog>
    </DialogContext.Provider>
  );
}
