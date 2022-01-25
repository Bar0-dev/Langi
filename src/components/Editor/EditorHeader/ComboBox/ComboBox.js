import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props) {
  return (
    <Autocomplete
      value={props.value}
      onChange={props.onChange}
      disablePortal
      id={`select-language-${props.label}`}
      options={props.languages}
      sx={{ width: 200, mt: "15px" }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
