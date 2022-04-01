import { Button, Container } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Import(props) {
  const filePicker = useRef(null);
  const handleFilePick = (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    console.log(file);
  };
  return (
    <Container>
      <form>
        <input webkitdirectory="" type="file" onChange={handleFilePick} />
        <button>Submit</button>
      </form>
      <Button onClick={() => {}}>Import</Button>
    </Container>
  );
}
