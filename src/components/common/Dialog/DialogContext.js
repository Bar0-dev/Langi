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
import { useNavigate } from "react-router-dom";

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
        <Button onClick={props.handleUserResponse}>{props.button1}</Button>
        <Button onClick={handleClose}>{props.button2}</Button>
      </DialogActions>
    </Dialog>
  );
}

export function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({
    title: "",
    message: "",
    button1: "",
    button2: "",
  });
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleUserResponse = () => {
    dialogDispatcher(data, navigate);
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ setOpen, setContent, setData }}>
      {children}
      <AppDialog
        open={open}
        setOpen={setOpen}
        title={content.title}
        message={content.message}
        button1={content.button1 ? content.button1 : "OK"}
        button2={content.button2 ? content.button2 : "Cancel"}
        handleUserResponse={handleUserResponse}
      ></AppDialog>
    </DialogContext.Provider>
  );
}
