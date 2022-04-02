import { Button, Container } from "@mui/material";
import { useRef } from "react";
import { importDeckTxt } from "../../utilities/ankiAPI";

export default function Import(props) {
  const filePicker = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  const handleFilePick = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    console.log(file);
    const name = file.name.replace(".txt", "");
    const textData = await file.text();
    importDeckTxt(textData, name);
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleFilePick} />
        <button>Submit</button>
      </form>
      <Button onClick={() => {}}>Import</Button>
    </Container>
  );
}
