import { Button, Container } from "@mui/material";
import { useRef } from "react";
import { importDeckTxt } from "../../utilities/ankiAPI";

export default function Import(props) {
  const handleBrowserOpen = useRef(null);
  const handleFilePick = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    console.log(file);
    const name = file.name.replace(".txt", "");
    const textData = await file.text();
    importDeckTxt(textData, name);
  };
  const handleClick = () => {
    handleBrowserOpen.current.click();
  }
  return (
    <Container>
        <input ref={handleBrowserOpen} type="file" accept=".txt" onChange={handleFilePick} style={{display:"none"}} />
      <Button onClick={handleClick}>Import</Button>
    </Container>
  );
}
